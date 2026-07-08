# Takes uploaded PDF bytes and returns all extracted text

import fitz # PyMuPDF

def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""  # start with empty string that will hold all extracted text

    pdf = fitz.open(stream=file_bytes, filetype="pdf")

    for page in pdf:
        text += page.get_text()

    return text.strip()