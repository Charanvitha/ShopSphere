import { Star } from 'lucide-react';

const fallbackImage = 'https://placehold.co/800x800/f0f2f4/7c8794?text=ShopSphere';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.badge && <span className={`product-badge ${product.badge === 'Best Seller' ? 'badge-dark' : ''}`}>{product.badge}</span>}
        <img src={product.image} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage; }} />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-meta"><span className="product-rating"><Star size={14} fill="currentColor" /> {Number(product.rating).toFixed(1)}</span><span className="review-count">({product.reviewCount.toLocaleString()} reviews)</span></div>
        <div className="product-bottom"><span className="product-price">${Number(product.price).toLocaleString()}</span><span className="price-note">Free shipping</span></div>
      </div>
    </article>
  );
}
