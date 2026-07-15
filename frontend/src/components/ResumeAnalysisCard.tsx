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

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa",
          }}
        >
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
        </div>
    );
}

export default ResumeAnalysisCard;