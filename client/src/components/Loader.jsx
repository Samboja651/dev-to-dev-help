export default function Loader({ message = "Loading..." }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="text-muted">{message}</div>
    </div>
  );
}
