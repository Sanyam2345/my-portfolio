from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# --- CONNECTION POOLING OPTIMIZATION ---
# Render/Cloud Postgres often drops idle connections. 'pool_pre_ping=True' fixes this.
# 'pool_size' and 'max_overflow' limit connections to avoid mistakes.

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    print("Running in Production Mode (Render)")
    # Render (Postgres)
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,  # Critical for production stability
        pool_size=10,        # Standard tier limit is usually 20-50, keep it safe
        max_overflow=10,     # Allow burst
        pool_recycle=1800    # Recycle connections every 30 mins
    )
else:
    print("Running in Local Mode (SQLite)")
    # Local (SQLite)
    SQLALCHEMY_DATABASE_URL = "sqlite:///./portfolio.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, 
        connect_args={"check_same_thread": False} # Needed for SQLite
    )
    
    # Enable Write-Ahead Logging (WAL) for concurrency
    from sqlalchemy import event
    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA journal_mode=WAL")
        cursor.close()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
