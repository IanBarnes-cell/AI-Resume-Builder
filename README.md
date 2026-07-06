# AI Resume Builder

An AI-powered resume builder and job-tailoring web application that helps users upload resumes, analyze their content, match them to job descriptions, and improve resume bullet points with AI assistance.

---

## Project Overview

This project is a full-stack application built with a React frontend and a FastAPI backend. The goal is to allow users to upload a resume PDF, extract and analyze its contents, compare it against a job description, and generate AI-powered suggestions to improve the resume.

---

## Planned Features

- Upload resume as a PDF
- Extract text from uploaded resumes
- Display extracted resume content in the app
- Generate AI resume summaries
- Match resumes against job descriptions
- Suggest improved bullet points
- Recommend missing skills and keywords
- Export an updated resume

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- ESLint

### Backend
- Python
- FastAPI
- Uvicorn

### AI / Parsing / Utilities
- OpenAI API
- PyMuPDF
- python-dotenv
- python-multipart

---

## Folder Structure

```bash
AI-Resume-Builder/
│
├── frontend/          # React + TypeScript frontend
├── backend/           # FastAPI backend
├── docs/              # Project planning and roadmap
├── sample_resumes/    # Test resumes for development
├── screenshots/       # Images for README/demo
├── README.md
├── .gitignore
└── LICENSE