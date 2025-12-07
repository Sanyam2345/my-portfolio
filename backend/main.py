from fastapi import FastAPI, Depends, HTTPException, Request, Response, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database
import os

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

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



def send_email_notification(name: str, email: str, message: str):
    """
    Sends an email using standard smtplib with STARTTLS.
    Designed to be robust for Render deployment.
    """
    smtp_host = os.getenv("EMAIL_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("EMAIL_PORT", 587))
    smtp_user = os.getenv("EMAIL_USER")
    smtp_pass = os.getenv("EMAIL_PASS")
    receiver_email = os.getenv("RECEIVER_EMAIL")

    if not all([smtp_host, smtp_port, smtp_user, smtp_pass, receiver_email]):
        print("❌ Error: Missing Render environment variables for email.")
        return

    try:
        # Construct Email
        msg = MIMEMultipart()
        msg['From'] = f"Portfolio Bot <{smtp_user}>"
        msg['To'] = receiver_email
        msg['Subject'] = f"Portfolio Contact: {name}"

        body = f"""
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Message:</strong></p>
        <p>{message}</p>
        """
        msg.attach(MIMEText(body, 'html', 'utf-8'))

        # Connect and Send
        print(f"Connecting to SMTP: {smtp_host}:{smtp_port}...")
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.set_debuglevel(1) # Show SMTP interaction in Render logs
            server.starttls()        # Secure the connection
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
        
        print(f"✅ Email sent successfully to {receiver_email}!")

    except Exception as e:
        print(f"❌ critical SMTP Error: {str(e)}")
        traceback.print_exc()


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
