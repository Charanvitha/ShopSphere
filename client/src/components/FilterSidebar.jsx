import { X, SlidersHorizontal } from 'lucide-react';
import CategoryFilter from './CategoryFilter.jsx';
import PriceRangeFilter from './PriceRangeFilter.jsx';
import RatingFilter from './RatingFilter.jsx';

export default function FilterSidebar({ categories = [], selectedCategories = [], minPrice, maxPrice, priceBounds, minRating, onCategoryChange = () => {}, onMinPriceChange = () => {}, onMaxPriceChange = () => {}, onRatingChange = () => {}, onClear = () => {}, isOpen = false, onClose = () => {} }) {
  return (
    <>
      {isOpen && <button className="drawer-scrim" aria-label="Close filters" onClick={onClose} />}
      <aside className={`filter-sidebar ${isOpen ? 'drawer-open' : ''}`} aria-label="Product filters">
        <div className="filter-heading"><div><SlidersHorizontal size={17} /><h2>Filters</h2></div><button className="icon-button drawer-close" onClick={onClose} aria-label="Close filters"><X size={20} /></button></div>
        <CategoryFilter categories={categories} selected={selectedCategories} onChange={onCategoryChange} />
        <PriceRangeFilter minPrice={minPrice} maxPrice={maxPrice} bounds={priceBounds} onMinChange={onMinPriceChange} onMaxChange={onMaxPriceChange} />
        <RatingFilter value={minRating} onChange={onRatingChange} />
        <button className="clear-button" onClick={onClear}>Clear all filters</button>
      </aside>
    </>
  );
}
