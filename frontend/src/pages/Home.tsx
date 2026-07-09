import { useState } from "react";
import api from "../services/api";

type ResumeAnalysis = {
    word_count: number;
    bullet_count: number;
    email: string | null;
    phone: string | null;
    sections_found: string[];
};

type MatchResults = {
    match_score: number;
    matched_keywords: string[];
    missing_keywords: string[];
    job_keyword_count: number;
    matched_keyword_count: number;
};

function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);  // stores currently selected file
  const [jobDescription, setJobDescription] = useState("");
  const [extractedText, setExtractedText] = useState("");  // stores resume text returned by backend
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [matchResults, setMatchResults] = useState<MatchResults | null>(null);
  const [loading, setLoading] = useState(false);  // tracks whether upload request is currently happening

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try { // success
      setLoading(true);

      const response = await api.post("/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setExtractedText(response.data.text);
      setAnalysis(response.data.analysis);
      setMatchResults(null);
    } catch (error) { // failure
      console.error("Upload failed:", error);
      alert("Failed to upload and analyze resume.");
    } finally { // cleanup
      setLoading(false);
    }
  };

  const handleMatchJob = async () => {
    if (!selectedFile) {
      alert("Please select a PDF resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please paste a job description first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);

      const response = await api.post("/match-job", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setExtractedText(response.data.text);
      setAnalysis(response.data.analysis);
      setMatchResults(response.data.match_results);
    } catch (error) {
      console.error("Job match failed:", error);
      alert("Failed to match resume against job description.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>AI Resume Builder</h1>
      <p>Upload your resume and compare it against a job description.</p>

      <div style={{ marginBottom: "1rem" }}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading} style={{ marginLeft: "1rem" }}>
          {loading ? "Processing..." : "Upload Resume"}
        </button>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <h2>Job Description</h2>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={10}
          style={{ width: "100%", padding: "1rem", borderRadius: "8px" }}
          placeholder="Paste the job description here..."
        />
        <button onClick={handleMatchJob} disabled={loading} style={{ marginTop: "1rem" }}>
          {loading ? "Matching..." : "Analyze Match"}
        </button>
      </div>

      {analysis && (
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
      )}

      {matchResults && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#f5fbff",
          }}
        >
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
        </div>
      )}

      {extractedText && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Extracted Resume Text</h2>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#f4f4f4",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            {extractedText}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Home;