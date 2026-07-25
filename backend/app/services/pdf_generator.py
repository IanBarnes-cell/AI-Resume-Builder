from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import textwrap  # so text wont run off page


def generate_pdf(ai_suggestions: dict, output_path: str):

    TOP_MARGIN = 750
    BOTTOM_MARGIN = 80
    LINE_HEIGHT = 18

    y = TOP_MARGIN

    pdf = canvas.Canvas(output_path, pagesize=letter)

    y = 750

    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(50, y, "AI Resume Improvement Report")

    y -= 40


    # OVERALL FEEDBACK SECTION

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Overall Feedback")

    y -= 20

    pdf.setFont("Helvetica-Bold", 14)

    pdf.line(50, y, 550, y)
    y -= 15

    pdf.setFont("Helvetica", 11)

    feedback = ai_suggestions["overall_feedback"]

    wrapped_feedback = textwrap.wrap(feedback, width=85)

    for line in wrapped_feedback:

        if y < BOTTOM_MARGIN:
            pdf.showPage()
            pdf.setFont("Helvetica", 11)
            y = TOP_MARGIN

        pdf.drawString(60, y, line)

        y -= LINE_HEIGHT

    y -= 20



    # IMPROVEMENT SUGGESTIONS SECTION

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Improvement Suggestions")
    y -= 20

    pdf.setFont("Helvetica-Bold", 14)

    pdf.line(50, y, 550, y)
    y -= 15

    pdf.setFont("Helvetica", 11)

    for suggestion in ai_suggestions["improvement_suggestions"]:

        wrapped = textwrap.wrap(suggestion, width=80)

        # Print the first wrapped line with a bullet
        pdf.drawString(60, y, f"• {wrapped[0]}")
        y -= 18

        # Print remaining wrapped lines without another bullet
        for line in wrapped[1:]:

            if y < BOTTOM_MARGIN:
                pdf.showPage()
                pdf.setFont("Helvetica",11)
                y = TOP_MARGIN
            pdf.drawString(75, y, line)
            y -= LINE_HEIGHT

        y -= 8


    # MISSING SKILLS SECTION

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Missing Skills")

    y -= 20

    pdf.setFont("Helvetica-Bold", 14)

    pdf.line(50, y, 550, y)
    y -= 15

    pdf.setFont("Helvetica", 11)

    for skill in ai_suggestions["missing_skills"]:
        pdf.drawString(60, y, f"• {skill}")
        y -= 18

    y -= 20


    # BULLET REWRITES SECTION

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Bullet Rewrites")

    y -= 20

    pdf.setFont("Helvetica-Bold", 14)

    pdf.line(50, y, 550, y)
    y -= 15

    pdf.setFont("Helvetica", 11)

    for bullet in ai_suggestions["bullet_rewrites"]:

        wrapped = textwrap.wrap(bullet, width=80)

        # First line gets the bullet
        pdf.drawString(60, y, f"• {wrapped[0]}")
        y -= 18

        # Remaining lines are indented
        for line in wrapped[1:]:
            if y < BOTTOM_MARGIN:
                pdf.showPage()
                pdf.setFont("Helvetica",11)
                y = TOP_MARGIN
            pdf.drawString(75, y, line)
            y -= LINE_HEIGHT

        y -= 8



    # TAILORED SUMMARY SECTION

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(50, y, "Tailored Summary")
    y -= 20

    pdf.setFont("Helvetica-Bold", 14)

    pdf.line(50, y, 550, y)
    y -= 15

    pdf.setFont("Helvetica", 11)

    summary = ai_suggestions["tailored_summary"]

    wrapped_summary = textwrap.wrap(summary, width=85)

    for line in wrapped_summary:

        if y < BOTTOM_MARGIN:
            pdf.showPage()
            pdf.setFont("Helvetica", 11)
            y = TOP_MARGIN

        pdf.drawString(60, y, line)

        y -= LINE_HEIGHT

    pdf.save()