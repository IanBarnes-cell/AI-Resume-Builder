import { useState } from "react";
import api from "../services/api";

import ResumeUpload from "../components/ResumeUpload";
import JobDescriptionInput from "../components/JobDescriptionInput";
import ResumeAnalysisCard from "../components/ResumeAnalysisCard";
import MatchResultsCard from "../components/MatchResultsCard";
import AISuggestionsCard from "../components/AISuggestionsCard";

type AISuggestions = {
    overall_feedback: string;
    improvement_suggestions: string[];
    missing_skills: string[];
    bullet_rewrites: string[]
    tailored_summary: string;
};

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
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions | null>(null);

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

  const handleGenerateSuggestions = async () => {
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

        const response = await api.post("/ai-suggestions", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        setExtractedText(response.data.text);
        setAiSuggestions(response.data.ai_suggestions);
    } catch (error) {
        console.error("AI suggestion request failed:", error);
        alert("Failed to generate AI suggestions.");
    } finally {
        setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
      if (!selectedFile) {
          alert("Upload a resume first.");
          return;
      }

      if (!jobDescription.trim()) {
          alert("Paste a job description first.");
          return;
      }

      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("job_description", jobDescription);

      try {

          const response = await api.post(
              "/download-report",
              formData,
              {
                  responseType: "blob",
              }
          );

          const url = window.URL.createObjectURL(  // creates temporary url pointing to "Blob" of raw binary file data
              new Blob([response.data])
          );

          const link = document.createElement("a");

          link.href = url;

          link.download = "Resume_Improvement_Report.pdf";

          link.click();

          window.URL.revokeObjectURL(url);

      } catch (error) {

          console.error(error);

          alert("Download failed.");

      }
  };

  return (
    <div className="page">
      <div className="hero">
        
        <h1>AI Resume Builder</h1>

        <p>
          Upload your resume, compare it against job descriptions,
          and receive personalized AI-powered feedback.
        </p>

        <ResumeUpload 
          loading={loading} 
          handleUpload={handleUpload} 
          handleFileChange={handleFileChange} 
        />

        <JobDescriptionInput
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          loading={loading}
          handleMatchJob={handleMatchJob}
          handleGenerateSuggestions={handleGenerateSuggestions}
          handleDownloadReport={handleDownloadReport}
        />

        <ResumeAnalysisCard
          analysis={analysis}
        />

        <MatchResultsCard
          matchResults={matchResults}
        />

        <AISuggestionsCard
          aiSuggestions={aiSuggestions}
        />     

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
    </div>
  );
}

export default Home; 