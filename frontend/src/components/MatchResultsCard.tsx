import Card from "./Card"

type MatchResults = {
    match_score: number;
    matched_keywords: string[];
    missing_keywords: string[];
    job_keyword_count: number;
    matched_keyword_count: number;
};

type MatchResultsCardProps = {
    matchResults: MatchResults | null;
};

function MatchResultsCard({
    matchResults,
}: MatchResultsCardProps) {

    if (!matchResults) return null;

    return (
        <Card title="Jobe Match Results">
          <h2>Job Match Results</h2>
          <p><strong>Match Score:</strong> {matchResults.match_score}%</p>
          <p>
            <strong>Matched Keywords ({matchResults.matched_keyword_count}):</strong>{" "}
            {matchResults.matched_keywords.length > 0
              ? matchResults.matched_keywords.join(", ")
              : "None"}
          </p>
          <p>
            <strong>Missing Keywords:</strong>{" "}
            {matchResults.missing_keywords.length > 0
              ? matchResults.missing_keywords.join(", ")
              : "None"}
          </p>
        </Card>
    );
}

export default MatchResultsCard;