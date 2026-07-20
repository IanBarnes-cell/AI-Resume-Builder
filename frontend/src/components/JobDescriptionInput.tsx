type JobDescriptionInputProps = {
    jobDescription: string;
    setJobDescription: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    handleMatchJob: () => void;
    handleGenerateSuggestions: () => void;
    handleDownloadReport: () => void;
};

function JobDescriptionInput({
    jobDescription,
    setJobDescription,
    loading,
    handleMatchJob,
    handleGenerateSuggestions,
    handleDownloadReport,
}: JobDescriptionInputProps) {
    return (         
      <div style={{ marginTop: "1.5rem" }}>
        <h2>Job Description</h2>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={10}
          style={{ width: "100%", padding: "1rem", borderRadius: "8px" }}
          placeholder="Paste the job description here..."
        />

        <div style={{ marginTop: "1rem" }}>
            <button onClick={handleMatchJob} disabled={loading} style={{ marginTop: "1rem" }}>
                {loading ? "Matching..." : "Analyze Match"}
            </button>
            <button onClick={handleGenerateSuggestions} disabled={loading} style={{ marginTop: "1rem", marginLeft: "1rem" }}>
                {loading ? "Generating..." : "Generate AI Suggestions"}
            </button>
            <button onClick={handleDownloadReport} disabled={loading} style={{marginTop: "1rem", marginLeft: "1rem"}}
            >
                Download Report
            </button>
        </div>
      </div>
    );
}

export default JobDescriptionInput;