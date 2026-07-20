from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


def generate_pdf(ai_suggestions: dict, output_path: str):
    pdf = canvas.Canvas(output_path, pagesize=letter)

    y = 750

    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(50, y, "AI Resume Improvement Report")

    y -= 40

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Overall Feedback")

    y -= 20

    pdf.setFont("Helvetica", 11)

    feedback = ai_suggestions["overall_feedback"]

    for line in feedback.split(". "):
        pdf.drawString(60, y, line)
        y -= 18

    y -= 20

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Missing Skills")

    y -= 20

    pdf.setFont("Helvetica", 11)

    for skill in ai_suggestions["missing_skills"]:
        pdf.drawString(60, y, f"• {skill}")
        y -= 18

    y -= 20

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Bullet Rewrites")

    y -= 20

    pdf.setFont("Helvetica", 11)

    for bullet in ai_suggestions["bullet_rewrites"]:
        pdf.drawString(60, y, f"• {bullet}")
        y -= 18

    pdf.save()