from fastapi import FastAPI, Depends, HTTPException, Request, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database
import os

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

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/projects", response_model=List[schemas.Project])
def read_projects(response: Response, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # Cache for 1 hour
    response.headers["Cache-Control"] = "public, max-age=3600"
    projects = db.query(models.Project).offset(skip).limit(limit).all()
    return projects

@app.post("/contact", response_model=schemas.Message)
def create_contact(message: schemas.MessageCreate, db: Session = Depends(get_db)):
    db_message = models.Message(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@app.on_event("startup")
def startup_event():
    pass
