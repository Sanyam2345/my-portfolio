from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Internal Render URL (Reference): postgresql://portfolio_db_g5ia_user:CJM0T3ECBxaH3rNa8PnhiBn7IDQcOLCk@dpg-d4qa2rali9vc739qh1cg-a/portfolio_db_g5ia
# Check if we are running on Render
if os.getenv("RENDER"):
    # Output for debugging (remove in strict prod if needed)
    print("Running in Production Mode (Render)")
    SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
else:
    print("Running in Local Mode (SQLite)")
    SQLALCHEMY_DATABASE_URL = "sqlite:///./portfolio.db"

if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, 
        pool_pre_ping=True, 
        pool_recycle=3600
    )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
