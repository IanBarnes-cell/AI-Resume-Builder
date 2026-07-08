import { useState } from "react";
import api from "../services/api";

type ResumeAnalysis = {
    word_count: number;
    bullet_count: number;
    email: string | null;
    phone: string | null;
    sections_found: string[];
};

function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);  // stores currently selected file
  const [extractedText, setExtractedText] = useState("");  // stores resume text returned by backend
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
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
    } catch (error) { // failure
      console.error("Upload failed:", error);
      alert("Failed to upload and analyze resume.");
    } finally { // cleanup
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>AI Resume Builder</h1>
      <p>Upload your resume PDF to extract and analyze its text.</p>

      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading} style={{ marginLeft: "1rem" }}>
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

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
          <p><strong>Sections Found:</strong> {analysis.sections_found.length > 0 ? analysis.sections_found.join(", ") : "None detected"}</p>
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