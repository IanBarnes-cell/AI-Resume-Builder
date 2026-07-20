import styles from "./ResumeUpload.module.css";

type ResumeUploadProps = {
    loading: boolean;
    selectedFile: File | null;
    handleUpload: () => void;
    handleFileChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
};

function ResumeUpload({ 
    loading,
    selectedFile,
    handleUpload,
    handleFileChange,
}: ResumeUploadProps) {
    return (       
      <div className={styles.container}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        {selectedFile && (
            <p>
                <strong>Selected file:</strong>{selectedFile.name}
            </p>
        )}
        <button onClick={handleUpload} disabled={loading} className={styles.uploadButton}>
          {loading ? "Processing..." : "Upload Resume"}
        </button>
      </div>
    );
}

export default ResumeUpload;
