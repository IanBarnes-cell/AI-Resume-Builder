# -------------------------------------------------------- #
# 1. loads the OpenAI API key from .env
# 2. builds a prompt with:
# 3. resume text
# 4. job description
# 5. asks the model for structured JSON
# 6. parses the returned JSON
# 7. sends that structured result back to your route
# --------------------------------------------------------- #

import json
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # loads OpenAI API key from .env


def generate_resume_suggestions(resume_text: str, job_description: str) -> dict: 
    prompt = f"""
You are an expert resume reviewer and career coach.

A user has uploaded a resume and pasted a job description.
Your task is to compare the resume to the job description and provide practical resume-improvement suggestions.

Return ONLY valid JSON in this exact format:
{{
  "overall_feedback": "2-4 sentence high-level evaluation of how well the resume fits the job",
  "improvement_suggestions": [
    "suggestion 1",
    "suggestion 2",
    "suggestion 3"
  ],
  "missing_skills": [
    "skill 1",
    "skill 2"
  ],
  "bullet_rewrites": [
    "rewritten bullet 1",
    "rewritten bullet 2"
  ],
  "tailored_summary": "A short professional summary tailored to the job description"
}}

Resume:
{resume_text}

Job Description:
{job_description}
"""

    response = client.responses.create(
        model="gpt-5",
        input=prompt
    )

    raw_output = response.output_text.strip()

    try:
        return json.loads(raw_output)
    except json.JSONDecodeError:
        return {
            "overall_feedback": raw_output,
            "improvement_suggestions": [],
            "missing_skills": [],
            "bullet_rewrites": [],
            "tailored_summary": ""
        }
    


