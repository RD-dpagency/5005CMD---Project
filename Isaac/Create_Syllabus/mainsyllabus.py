from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import logging
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Database (in-memory for this example)
syllabus_db = []
activities_db = []

# Pydantic models
class Syllabus(BaseModel):
    id: int 
    title: str
    description: str
    activities: List[int]

class Activity(BaseModel):
    id: int
    title: str 
    description: str
    syllabus_id: int

# API Endpoints
@app.get("/")
def read_root():
    """Root endpoint"""
    logger.debug("Root endpoint called")
    return {"message": "Hello, World!"}

@app.get("/syllabus/{syllabus_id}", response_model=Syllabus)
def get_syllabus(syllabus_id: int):
    """Get a syllabus by ID"""
    syllabus = next((s for s in syllabus_db if s.id == syllabus_id), None)
    if not syllabus:
        logger.error(f"Syllabus not found: {syllabus_id}")
        raise HTTPException(status_code=404, detail="Syllabus not found")
    return syllabus

@app.post("/activity/", response_model=Activity)
def create_activity(activity: Activity):
    """Create a new activity"""
    # Validate syllabus exists
    if not any(s.id == activity.syllabus_id for s in syllabus_db):
        raise HTTPException(status_code=400, detail="Syllabus not found")
    
    # Check for duplicate activity ID
    if any(a.id == activity.id for a in activities_db):
        raise HTTPException(status_code=400, detail="Activity ID already exists")
    
    activities_db.append(activity)
    logger.info(f"Created activity: {activity.id}")
    return activity

@app.get("/activity/{activity_id}", response_model=Activity)
def get_activity(activity_id: int):
    """Get an activity by ID"""
    activity = next((a for a in activities_db if a.id == activity_id), None)
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    return activity

@app.get("/syllabus/{syllabus_id}/activities", response_model=List[Activity])
def get_activities_for_syllabus(syllabus_id: int):
    """Get all activities for a syllabus"""
    return [a for a in activities_db if a.syllabus_id == syllabus_id]

@app.post("/syllabus/", response_model=Syllabus)
def create_syllabus(syllabus: Syllabus):
    """Create a new syllabus"""
    if any(s.id == syllabus.id for s in syllabus_db):
        raise HTTPException(status_code=400, detail="Syllabus ID already exists")
    syllabus_db.append(syllabus)
    logger.info(f"Created syllabus: {syllabus.id}")
    return syllabus

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500", "http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Run the application
if __name__ == "__main__":
    uvicorn.run("mainsyllabus:app", host="127.0.0.1", port=8000, reload=True)