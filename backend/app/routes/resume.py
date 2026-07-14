from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from app.services.resume_parser import extract_text_from_pdf
from app.services.resume_analyzer import analyze_resume_text
from app.services.job_matcher import match_resume_to_job
from app.services.ai_suggester import generate_resume_suggestions

router = APIRouter()  # creates router object

@router.post("/upload-resume")  # defines POST endpoint
async def upload_resume(file: UploadFile = File(...)):  # define function that runs when /upload-resume is pressed
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    file_bytes = await file.read()  # reads uploaded file into memory as raw bytes -> stores into file_bytes
    extracted_text = extract_text_from_pdf(file_bytes)
    analysis = analyze_resume_text(extracted_text) 

    return {
        "text": extracted_text,
        "analysis": analysis,
    }  # sends response back to frontend as JSON


@router.post("/match-job")
async def match_job(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    file_bytes = await file.read()
    extracted_text = extract_text_from_pdf(file_bytes)
    analysis = analyze_resume_text(extracted_text)
    match_results = match_resume_to_job(extracted_text, job_description)

    return {
        "text": extracted_text,
        "analysis": analysis,
        "match_results": match_results,
    }

@router.post("/ai-suggestions")
async def ai_suggestions(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    file_bytes = await file.read()
    extracted_text = extract_text_from_pdf(file_bytes)

    suggestions = generate_resume_suggestions(extracted_text, job_description)

    return {
        "text": extracted_text,
        "ai_suggestions": suggestions
    }