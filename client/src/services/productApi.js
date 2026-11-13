const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function requestJson(path, signal) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || `Request failed with status ${response.status}.`);
  return payload;
}

export async function fetchProducts(filters, signal) {
  const params = new URLSearchParams();
  if (filters.categories.length) params.set('category', filters.categories.join(','));
  if (filters.minPrice !== undefined) params.set('minPrice', String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice));
  if (filters.minRating) params.set('minRating', String(filters.minRating));
  if (filters.search.trim()) params.set('search', filters.search.trim());
  params.set('sortBy', filters.sortBy);
  params.set('page', String(filters.page));
  params.set('limit', String(filters.limit));
  return requestJson(`/api/products?${params.toString()}`, signal);
}

export function fetchFilterOptions(signal) {
  return requestJson('/api/products/filters', signal);
}
