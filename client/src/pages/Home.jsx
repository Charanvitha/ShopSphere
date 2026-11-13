import { useState } from 'react';
import { ArrowDownWideNarrow, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import SortDropdown from '../components/SortDropdown.jsx';
import ActiveFilters from '../components/ActiveFilters.jsx';
import useProducts from '../hooks/useProducts.js';

const PAGE_SIZE = 30;

export default function Home() {
  const [filters, setFilters] = useState({ categories: [], minPrice: undefined, maxPrice: undefined, minRating: null, search: '', sortBy: 'featured', page: 1, limit: PAGE_SIZE });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { products, totalProducts, currentPage, totalPages, loading, error, filterOptions } = useProducts(filters);
  const bounds = filterOptions.priceRange;

  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value, ...(key !== 'page' ? { page: 1 } : {}) }));
  const toggleCategory = (category) => update('categories', filters.categories.includes(category)
    ? filters.categories.filter((item) => item !== category)
    : [...filters.categories, category]);
  const reset = () => setFilters((current) => ({ ...current, categories: [], minPrice: undefined, maxPrice: undefined, minRating: null, search: '', sortBy: 'featured', page: 1 }));
  const removeFilter = (kind, value) => {
    if (kind === 'category') update('categories', filters.categories.filter((category) => category !== value));
    if (kind === 'minPrice') update('minPrice', undefined);
    if (kind === 'maxPrice') update('maxPrice', undefined);
    if (kind === 'minRating') update('minRating', null);
    if (kind === 'search') update('search', '');
  };

  return (
    <div id="top" className="app-shell">
      <Navbar searchValue={filters.search} onSearchChange={(value) => update('search', value)} onOpenFilters={() => setFiltersOpen(true)} />
      <main className="page-container" id="catalog">
        <section className="hero-intro">
          <div className="eyebrow"><span className="eyebrow-line" /> THE EVERYDAY EDITION</div>
          <h1>Discover products<br /><span>made for your life.</span></h1>
          <p>Thoughtful finds for work, home, and everywhere in between.</p>
        </section>
        <div className="catalog-heading">
          <div><h2>Discover Products</h2><p>Find something you’ll love.</p></div>
          <div className="catalog-mobile-controls">
            <button className="mobile-sort-label" onClick={() => document.querySelector('.sort-control select')?.focus()}><ArrowDownWideNarrow size={16} /> Sort</button>
            <button className="mobile-sort-label" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={16} /> Filters</button>
          </div>
        </div>
        <div className="catalog-layout">
          <FilterSidebar categories={filterOptions.categories} selectedCategories={filters.categories} minPrice={filters.minPrice ?? bounds.min} maxPrice={filters.maxPrice ?? bounds.max} priceBounds={bounds} minRating={filters.minRating} onCategoryChange={toggleCategory} onMinPriceChange={(value) => update('minPrice', value)} onMaxPriceChange={(value) => update('maxPrice', value)} onRatingChange={(value) => update('minRating', value)} onClear={reset} isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} />
          <section className="catalog-results" aria-label="Product results">
            <div className="results-toolbar"><span className="results-count">Showing <strong>{totalProducts} {totalProducts === 1 ? 'product' : 'products'}</strong></span><SortDropdown value={filters.sortBy} onChange={(value) => update('sortBy', value)} /></div>
            <ActiveFilters categories={filters.categories} minPrice={filters.minPrice} maxPrice={filters.maxPrice} priceBounds={bounds} minRating={filters.minRating} search={filters.search} onRemove={removeFilter} />
            <ProductGrid products={products} loading={loading || filterOptions.loading} error={error || filterOptions.error} onReset={reset} />
            {!loading && !error && totalPages > 1 && <nav className="pagination" aria-label="Product pages"><button disabled={currentPage <= 1} onClick={() => update('page', currentPage - 1)}><ChevronLeft size={16} /> Previous</button><span>Page {currentPage} of {totalPages}</span><button disabled={currentPage >= totalPages} onClick={() => update('page', currentPage + 1)}>Next <ChevronRight size={16} /></button></nav>}
          </section>
        </div>
        <footer id="about" className="site-footer"><span>© 2026 ShopSphere</span><span>Considered goods. Better everyday.</span></footer>
      </main>
    </div>
  );
}
