from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    tags = Column(String, index=True) # Index for filtering by tags
    link = Column(String)
    image = Column(String)

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, index=True) # Index for searching by email
    message = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
