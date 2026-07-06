# Starter code with minimal API endpointto test that backend works

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "AI Resume Builder backend is running"}