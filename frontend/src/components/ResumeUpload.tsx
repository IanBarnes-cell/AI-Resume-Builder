import styles from "./ResumeUpload.module.css";

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
      <div className={styles.container}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading} className={styles.uploadButton}>
          {loading ? "Processing..." : "Upload Resume"}
        </button>
      </div>
    );
}

export default ResumeUpload;
