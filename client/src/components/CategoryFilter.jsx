export default function CategoryFilter({ categories = [], selected = [], onChange = () => {} }) {
  return (
    <section className="filter-section">
      <h3>Category</h3>
      <div className="category-options">
        {categories.map((category) => <label className="check-option" key={category}>
          <input type="checkbox" checked={selected.includes(category)} onChange={() => onChange(category)} />
          <span className="custom-checkbox" aria-hidden="true" />
          <span>{category}</span>
        </label>)}
      </div>
    </section>
  );
}
