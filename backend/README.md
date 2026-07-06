Notes

-------------------------------------------------------------------------------------------

Virtual Environment Package Installation

pip install fastapi uvicorn python-multipart pymupdf python-dotenv openai

fastapi → backend framework
uvicorn → runs the API server
python-multipart → file uploads
pymupdf → reading PDF resumes
python-dotenv → loading API keys from .env
openai → LLM API calls later

-------------------------------------------------------------------------------------------

Open Backend Server

uvicorn app.main:app --reload

-------------------------------------------------------------------------------------------



