import { useEffect, useState } from 'react';
import { fetchFilterOptions, fetchProducts } from '../services/productApi.js';

export default function useProducts(filters) {
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
  const [productsState, setProductsState] = useState({ products: [], totalProducts: 0, currentPage: 1, totalPages: 0, loading: true, error: '' });
  const [filterOptions, setFilterOptions] = useState({ categories: [], priceRange: { min: 0, max: 0 }, loading: true, error: '' });

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(filters.search), 300);
    return () => window.clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    const controller = new AbortController();
    fetchFilterOptions(controller.signal)
      .then((result) => setFilterOptions({ ...result, loading: false, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError') setFilterOptions((current) => ({ ...current, loading: false, error: error.message }));
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setProductsState((current) => ({ ...current, loading: true, error: '' }));
    fetchProducts({ ...filters, search: debouncedSearch }, controller.signal)
      .then((result) => setProductsState({ ...result, loading: false, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError') setProductsState((current) => ({ ...current, loading: false, error: error.message }));
      });
    return () => controller.abort();
  }, [filters.categories, filters.minPrice, filters.maxPrice, filters.minRating, filters.sortBy, filters.page, filters.limit, debouncedSearch]);

  return { ...productsState, filterOptions };
}
