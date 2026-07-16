import Card from "./Card"

type AISuggestions = {
    overall_feedback: string;
    improvement_suggestions: string[];
    missing_skills: string[];
    bullet_rewrites: string[];
    tailored_summary: string;
};

type AISuggestionsCardProps = {
    aiSuggestions: AISuggestions | null;
};

function AISuggestionsCard({
    aiSuggestions,
}: AISuggestionsCardProps) {

    if (!aiSuggestions) return null;

    return (

        <Card title="AI Suggestions">
          <h2>AI Resume Suggestions</h2>

          <p>
            <strong>Overall Feedback:</strong> {aiSuggestions.overall_feedback}
          </p>

          <div style={{ marginTop: "1rem" }}>
            <strong>Improvement Suggestions:</strong>
            <ul>
              {aiSuggestions.improvement_suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <strong>Missing Skills / Keywords:</strong>
            <ul>
              {aiSuggestions.missing_skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <strong>Bullet Rewrite Suggestions:</strong>
            <ul>
              {aiSuggestions.bullet_rewrites.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <strong>Tailored Summary:</strong>
            <p>{aiSuggestions.tailored_summary}</p>
          </div>
        </Card>
    );
}

export default AISuggestionsCard;
