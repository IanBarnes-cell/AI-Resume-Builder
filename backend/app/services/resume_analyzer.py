import re
SECTION_KEYWORDS = [
    "education",
    "experience",
    "projects",
    "skills",
    "certifications",
    "summary",
    "leadership",
    "activities"
]

def analyze_resume_text(text: str) -> dict:
    #Normalize text for easier searching
    lower_text = text.lower()

    # Word Count
    words = text.split()
    word_count = len(words)

    # Approx bullet count
    bullet_count = text.count(".") + text.count("- ")

    # Email extraction
    email_match = re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text)
    email = email_match.group(0) if email_match else None

    # Phone extraction (simple version)
    phone_match = re.search(
        r"(\+?1[\s\-\.]?)?(\(?\d{3}\)?[\s\-\.]?\d{3}[\s\-\.]?\d{4})",
        text
    )
    phone = phone_match.group(0) if phone_match else None

    # Section detection 
    found_sections = []
    for section in SECTION_KEYWORDS:
        if section in lower_text:
            found_sections.append(section.title())

    return {
        "word_count": word_count,
        "bullet_count": bullet_count,
        "email": email,
        "phone": phone,
        "sections_found": found_sections,
    }
    
