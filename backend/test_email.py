import os
import asyncio
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from dotenv import load_dotenv

load_dotenv()

async def simple_send():
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
    
    print("--- DEBUG INFO ---")
    print(f"User: {conf.MAIL_USERNAME}")
    # Don't print the actual password, just length
    print(f"Pass Length: {len(conf.MAIL_PASSWORD)}")
    print(f"Port: {conf.MAIL_PORT}")
    print(f"Server: {conf.MAIL_SERVER}")
    print("------------------")

    receiver = os.getenv("RECEIVER_EMAIL")
    if not receiver:
        print("❌ RECEIVER_EMAIL is missing!")
        return

    print(f"Sending to: {receiver}...")

    message = MessageSchema(
        subject="Test Email from Portfolio Debugger",
        recipients=[receiver],
        body="<h1>If you see this, email is working!</h1>",
        subtype=MessageType.html
    )

    try:
        fm = FastMail(conf)
        await fm.send_message(message)
        print("✅ Email sent successfully!")
    except Exception as e:
        print(f"❌ Failed to send Email: {e}")

if __name__ == "__main__":
    asyncio.run(simple_send())
