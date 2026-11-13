export default function LoadingState() {
  return <div className="loading-grid" role="status" aria-label="Loading products">{Array.from({ length: 8 }, (_, index) => <div className="skeleton-card" key={index}><div className="skeleton-image" /><div className="skeleton-line short" /><div className="skeleton-line" /><div className="skeleton-line medium" /></div>)}</div>;
}
