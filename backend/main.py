from fastapi import FastAPI, Depends, HTTPException, Request, Response, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database
import os
import httpx
import logging

# --- LOGGING SETUP ---
# Structured logging is better for production debugging (Render/CloudWatch compatible)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("portfolio_backend")

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="Portfolio API",
    description="High-performance backend for portfolio site",
    version="2.0.0"
)

# --- MIDDLEWARE OPTIMIZATION ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In strict prod, allow_origins=[os.getenv("FRONTEND_URL")]
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"], # Limit methods for security
    allow_headers=["*"],
    max_age=3600, # Cache preflight requests for 1 hour to reduce latency
)

@app.get("/")
def read_root():
    return {"status": "online", "message": "Portfolio API is running smoothly"}

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Global Exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error"},
    )

# --- ASYNC TELEGRAM NOTIFICATION ---
async def send_telegram_notification(name: str, email: str, message: str):
    """
    Sends a notification to Telegram using Async HTTPX Client.
    Non-blocking I/O.
    """
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")

    if not bot_token or not chat_id:
        logger.error("Missing Telegram environment variables (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID)")
        return

    try:
        text = f"🚀 *New Portfolio Contact*\n\n*Name:* {name}\n*Email:* {email}\n*Message:*\n{message}"
        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        payload = {
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "Markdown"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, timeout=10.0)
            
            if response.status_code == 200:
                logger.info("✅ Telegram notification sent successfully!")
            else:
                logger.warning(f"❌ Failed to send Telegram notification: {response.text}")

    except Exception as e:
        logger.error(f"❌ Telegram Error: {str(e)}", exc_info=True)


@app.get("/projects", response_model=List[schemas.Project])
def read_projects(response: Response, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Fetch projects. 
    SYNC 'def' is OK here because db.query is a blocking synchronous call.
    FastAPI runs this in a threadpool, preventing blocking of the main loop.
    """
    # Cache for 1 hour (Client-side)
    response.headers["Cache-Control"] = "public, max-age=3600"
    
    # Simple query, usually fast.
    projects = db.query(models.Project).offset(skip).limit(limit).all()
    return projects

@app.post("/contact", response_model=schemas.Message)
def create_contact(message: schemas.MessageCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Handle contact form submissions.
    OPTIMIZATION: Changed to 'def' (SYNC) because SQLAlchemy 'db.add/commit' are blocking.
    Running as sync lets FastAPI put this in a worker thread, keeping the async loop free.
    """
    try:
        # Save to DB (Blocking I/O -> Threadpool)
        db_message = models.Message(**message.dict())
        db.add(db_message)
        db.commit()
        db.refresh(db_message)
        
        # Trigger Notification (Async -> Event Loop)
        # BackgroundTasks can gracefully handle async functions even from sync endpoints
        background_tasks.add_task(send_telegram_notification, message.name, message.email, message.message)
        
        return db_message
    except Exception as e:
        logger.error(f"Error saving contact: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Could not save message")

@app.on_event("startup")
def startup_event():
    logger.info("Application Startup: performing checks...")
