import { X } from 'lucide-react';

export default function ActiveFilters({ categories = [], minPrice, maxPrice, priceBounds, minRating, search = '', onRemove = () => {} }) {
  const chips = [
    ...categories.map((value) => ({ key: `category:${value}`, label: value, remove: () => onRemove('category', value) })),
    ...(minPrice !== undefined && minPrice > priceBounds.min ? [{ key: 'minPrice', label: `From $${minPrice}`, remove: () => onRemove('minPrice') }] : []),
    ...(maxPrice !== undefined && maxPrice < priceBounds.max ? [{ key: 'maxPrice', label: `Up to $${maxPrice}`, remove: () => onRemove('maxPrice') }] : []),
    ...(minRating ? [{ key: 'rating', label: `${minRating}+ stars`, remove: () => onRemove('minRating') }] : []),
    ...(search ? [{ key: 'search', label: `“${search}”`, remove: () => onRemove('search') }] : []),
  ];
  if (!chips.length) return null;
  return <div className="active-filters" aria-label="Active filters">{chips.map((chip) => <button key={chip.key} className="filter-chip" onClick={chip.remove}>{chip.label}<X size={13} /></button>)}</div>;
}
