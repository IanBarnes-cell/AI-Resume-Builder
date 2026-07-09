import re

STOPWORDS = {
    "the", "and", "for", "with", "that", "this", "you", "your", "are",
    "our", "will", "have", "has", "from", "into", "about", "their",
    "they", "them", "using", "use", "used", "ability", "skills",
    "experience", "work", "team", "including", "strong", "years",
    "year", "plus", "such", "job", "role", "preferred", "required"
}

def extract_keywords(text: str) -> set[str]:
    words = re.findall(r"\b[a-zA-Z][a-zA-Z0-9+#.-]*\b", text.lower())

    keywords = {
        word for word in words
        if len(word) > 2 and word not in STOPWORDS
    }

    return keywords

def match_resume_to_job(resume_text: str, job_description: str) -> dict:
    resume_words = extract_keywords(resume_text)
    job_words = extract_keywords(job_description)

    matched = sorted(job_words & resume_words)
    missing = sorted(job_words - resume_words)

    if len(job_words) == 0:
        score = 0
    else:
        score = round((len(matched) / len(job_words)) * 100, 1)
    
    return {
        "match_score": score,
        "matched_keywords": matched,
        "missing_keywords": missing,
        "job_keyword_count": len(job_words),
        "matched_keyword_count": len(matched),
    }