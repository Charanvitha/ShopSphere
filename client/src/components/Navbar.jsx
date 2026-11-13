import { useState } from 'react';
import { ShoppingBag, SlidersHorizontal, Search, Menu, X } from 'lucide-react';

export default function Navbar({ searchValue = '', onSearchChange = () => {}, onOpenFilters = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-inner">
        <a className="brand" href="#top" aria-label="ShopSphere home">
          <span className="brand-mark">S</span><span>shopsphere</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="nav-link active" href="#top">Home</a>
          <a className="nav-link" href="#catalog">Shop</a>
          <a className="nav-link" href="#about">Our story</a>
        </nav>
        <label className="nav-search">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search products</span>
          <input value={searchValue} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search for anything..." />
          <kbd>⌘ K</kbd>
        </label>
        <div className="nav-actions">
          <button className="icon-button mobile-filter-button" onClick={onOpenFilters} aria-label="Open filters"><SlidersHorizontal size={19} /></button>
          <button className="bag-button" aria-label="Shopping bag, visual only"><ShoppingBag size={19} /><span>Bag</span><span className="bag-count">0</span></button>
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#top" onClick={() => setMenuOpen(false)}>Home</a><a href="#catalog" onClick={() => setMenuOpen(false)}>Shop</a><a href="#about" onClick={() => setMenuOpen(false)}>Our story</a></nav>}
    </header>
  );
}
