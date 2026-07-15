type ResumeUploadProps = {
    loading: boolean;
    handleUpload: () => void;
    handleFileChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
};

function ResumeUpload({ 
    loading,
    handleUpload,
    handleFileChange,
}: ResumeUploadProps) {
    return (       
      <div style={{ marginBottom: "1rem" }}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading} style={{ marginLeft: "1rem" }}>
          {loading ? "Processing..." : "Upload Resume"}
        </button>
      </div>
    );
}

export default ResumeUpload;
