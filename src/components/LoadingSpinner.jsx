export default function LoadingSpinner({ message = "" }) {
  return (
    <div className="loading-spinner">
      <div className="spinner" />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}
