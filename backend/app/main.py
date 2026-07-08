# Starter code with minimal API endpointto test that backend works

from fastapi import FastAPI  # FastAPI creates the server aplication
from fastapi.middleware.cors import CORSMiddleware  # allows React frontend to call the backend from localhost:5173
from app.routes.resume import router as resume_router

app = FastAPI()  # creates fastapi instance

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)  # connects upload route

@app.get("/")
def read_root():
    return {"message": "AI Resume Builder backend is running"}