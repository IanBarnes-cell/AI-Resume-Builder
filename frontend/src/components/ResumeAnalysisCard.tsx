import Card from "./Card"

type ResumeAnalysis = {
    word_count: number;
    bullet_count: number;
    email: string | null;
    phone: string | null;
    sections_found: string[];
};

type ResumeAnalysisCardProps = {
    analysis: ResumeAnalysis | null;
};

function ResumeAnalysisCard({ analysis }: ResumeAnalysisCardProps) {

    if (!analysis) return null;

    return (
        <Card title="Resume Analysis">

          <h2>Resume Analysis</h2>
          <p><strong>Word Count:</strong> {analysis.word_count}</p>
          <p><strong>Bullet Count:</strong> {analysis.bullet_count}</p>
          <p><strong>Email:</strong> {analysis.email ?? "Not found"}</p>
          <p><strong>Phone:</strong> {analysis.phone ?? "Not found"}</p>
          <p>
            <strong>Sections Found:</strong>{" "}
            {analysis.sections_found.length > 0
              ? analysis.sections_found.join(", ")
              : "None detected"}
          </p>
        </Card>
    );
}

export default ResumeAnalysisCard;