export default function SortDropdown({ value = 'featured', onChange = () => {} }) {
  return <label className="sort-control"><span>Sort by</span><select value={value} onChange={(event) => onChange(event.target.value)}>
    <option value="featured">Featured</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating-desc">Top Rated First</option>
  </select></label>;
}
