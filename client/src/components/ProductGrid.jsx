import ProductCard from './ProductCard.jsx';
import LoadingState from './LoadingState.jsx';
import EmptyState from './EmptyState.jsx';

export default function ProductGrid({ products = [], loading = false, error = '', onReset = () => {} }) {
  if (loading) return <LoadingState />;
  if (error) return <div className="error-state" role="alert"><span className="error-mark">!</span><h2>We couldn’t load the products</h2><p>{error}</p></div>;
  if (!products.length) return <EmptyState onReset={onReset} />;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
