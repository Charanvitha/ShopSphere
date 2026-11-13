import { SearchX } from 'lucide-react';

export default function EmptyState({ onReset = () => {} }) {
  return <div className="empty-state"><div className="empty-icon"><SearchX size={31} /></div><h2>No products match your filters.</h2><p>Try adjusting your search or clearing a few filters to see more products.</p><button className="primary-button" onClick={onReset}>Reset filters</button></div>;
}
