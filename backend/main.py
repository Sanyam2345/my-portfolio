from fastapi import FastAPI, Depends, HTTPException, Request, Response, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database
import os
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

# Create tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error"},
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email Configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("EMAIL_USER", ""),
    MAIL_PASSWORD=os.getenv("EMAIL_PASS", ""),
    MAIL_FROM=os.getenv("EMAIL_USER", "noreply@portfolio.com"),
    MAIL_PORT=int(os.getenv("EMAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("EMAIL_HOST", "smtp.gmail.com"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def send_email_notification(name: str, email: str, message: str):
    receiver = os.getenv("RECEIVER_EMAIL")
    if not receiver or not os.getenv("EMAIL_USER") or not os.getenv("EMAIL_PASS"):
        # print("⚠️ Email credentials missing. Email not sent.")
        return

    try:
        html = f"""
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Message:</strong></p>
        <p>{message}</p>
        """

        message = MessageSchema(
            subject=f"Portfolio Contact: {name}",
            recipients=[receiver],
            body=html,
            subtype=MessageType.html
        )

        fm = FastMail(conf)
        await fm.send_message(message)
        print("✅ Email sent successfully!")
    except Exception as e:
        print(f"❌ Failed to send Email: {e}")

@app.get("/projects", response_model=List[schemas.Project])
def read_projects(response: Response, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # Cache for 1 hour
    response.headers["Cache-Control"] = "public, max-age=3600"
    projects = db.query(models.Project).offset(skip).limit(limit).all()
    return projects

@app.post("/contact", response_model=schemas.Message)
async def create_contact(message: schemas.MessageCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    # Save to DB
    db_message = models.Message(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    # Trigger Notifications in background
    background_tasks.add_task(send_email_notification, message.name, message.email, message.message)
    
    return db_message

@app.on_event("startup")
def startup_event():
    pass
