import { Star } from 'lucide-react';

export default function RatingFilter({ value, onChange = () => {} }) {
  return (
    <section className="filter-section">
      <h3>Minimum rating</h3>
      <div className="rating-options">
        {[5, 4, 3, 2, 1].map((rating) => <label className="rating-option" key={rating}>
          <input type="radio" name="minimum-rating" checked={Number(value) === rating} onChange={() => onChange(rating)} />
          <span className="radio-dot" aria-hidden="true" />
          <span className="rating-stars" aria-label={`${rating} stars and up`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill={index < rating ? 'currentColor' : 'none'} />)}</span>
          <span className="rating-caption">& up</span>
        </label>)}
      </div>
    </section>
  );
}
