export default function PriceRangeFilter({ minPrice, maxPrice, bounds = { min: 0, max: 1000 }, onMinChange = () => {}, onMaxChange = () => {} }) {
  const min = minPrice ?? bounds.min;
  const max = maxPrice ?? bounds.max;
  const span = Math.max(1, bounds.max - bounds.min);
  const left = ((min - bounds.min) / span) * 100;
  const right = ((max - bounds.min) / span) * 100;

  return (
    <section className="filter-section">
      <div className="section-title-row"><h3>Price range</h3><span className="range-label">${min} — ${max}</span></div>
      <div className="range-slider" style={{ '--range-left': `${left}%`, '--range-right': `${right}%` }}>
        <input aria-label="Minimum price slider" type="range" min={bounds.min} max={bounds.max} value={min} onChange={(event) => onMinChange(Math.min(Number(event.target.value), max))} />
        <input aria-label="Maximum price slider" type="range" min={bounds.min} max={bounds.max} value={max} onChange={(event) => onMaxChange(Math.max(Number(event.target.value), min))} />
      </div>
      <div className="price-inputs">
        <label><span>Min</span><div><span>$</span><input type="number" min={bounds.min} max={max} value={min} onChange={(event) => onMinChange(Math.min(Number(event.target.value), max))} /></div></label>
        <span className="price-separator">to</span>
        <label><span>Max</span><div><span>$</span><input type="number" min={min} max={bounds.max} value={max} onChange={(event) => onMaxChange(Math.max(Number(event.target.value), min))} /></div></label>
      </div>
    </section>
  );
}
