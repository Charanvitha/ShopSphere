import products from '../data/products.json' with { type: 'json' };

const validCategories = new Set(products.map((product) => product.category));
const validSortOptions = new Set(['featured', 'price-asc', 'price-desc', 'rating-desc']);
const inventoryPrices = products.map((product) => product.price);
const inventoryMinPrice = Math.min(...inventoryPrices);
const inventoryMaxPrice = Math.max(...inventoryPrices);

function queryError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function parseOptionalNumber(value, name) {
  if (value === undefined || value === '') return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) throw queryError(`${name} must be a valid number.`);
  return parsed;
}

function parsePositiveInteger(value, name, defaultValue, maximum) {
  if (value === undefined || value === '') return defaultValue;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > maximum) {
    throw queryError(`${name} must be an integer between 1 and ${maximum}.`);
  }
  return parsed;
}

function parseCategories(value) {
  if (value === undefined || value === '') return [];
  const values = Array.isArray(value) ? value : [value];
  const categories = values.flatMap((item) => String(item).split(','))
    .map((category) => category.trim())
    .filter(Boolean);

  const invalid = categories.find((category) => !validCategories.has(category));
  if (invalid) throw queryError(`Unknown category: ${invalid}.`);
  return [...new Set(categories)];
}

function parseQuery(query) {
  const minPrice = parseOptionalNumber(query.minPrice, 'minPrice');
  const maxPrice = parseOptionalNumber(query.maxPrice, 'maxPrice');
  const minRating = parseOptionalNumber(query.minRating, 'minRating');
  const page = parsePositiveInteger(query.page, 'page', 1, 1000000);
  const limit = parsePositiveInteger(query.limit, 'limit', 30, 100);
  const sortBy = query.sortBy === undefined || query.sortBy === '' ? 'featured' : String(query.sortBy);

  if (minPrice !== undefined && minPrice < 0) throw queryError('minPrice cannot be negative.');
  if (maxPrice !== undefined && maxPrice < 0) throw queryError('maxPrice cannot be negative.');
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    throw queryError('minPrice cannot exceed maxPrice.');
  }
  if (minRating !== undefined && (minRating < 1 || minRating > 5)) {
    throw queryError('minRating must be between 1 and 5.');
  }
  if (!validSortOptions.has(sortBy)) {
    throw queryError(`Invalid sortBy. Choose one of: ${[...validSortOptions].join(', ')}.`);
  }

  return {
    categories: parseCategories(query.category),
    minPrice,
    maxPrice,
    minRating,
    search: String(query.search || '').trim().toLocaleLowerCase(),
    sortBy,
    page,
    limit,
  };
}

export function getProducts(query) {
  const options = parseQuery(query);
  let matchingProducts = products;

  // Keep each pass explicit so the business processing order is easy to follow.
  if (options.categories.length) {
    matchingProducts = matchingProducts.filter((product) => options.categories.includes(product.category));
  }

  matchingProducts = matchingProducts.filter((product) =>
    (options.minPrice === undefined || product.price >= options.minPrice) &&
    (options.maxPrice === undefined || product.price <= options.maxPrice));

  if (options.minRating !== undefined) {
    matchingProducts = matchingProducts.filter((product) => product.rating >= options.minRating);
  }

  if (options.search) {
    matchingProducts = matchingProducts.filter((product) =>
      product.name.toLocaleLowerCase().includes(options.search));
  }

  if (options.sortBy === 'price-asc') matchingProducts.sort((a, b) => a.price - b.price);
  if (options.sortBy === 'price-desc') matchingProducts.sort((a, b) => b.price - a.price);
  if (options.sortBy === 'rating-desc') matchingProducts.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  if (options.sortBy === 'featured') matchingProducts.sort((a, b) => a.id - b.id);

  const totalProducts = matchingProducts.length;
  const totalPages = Math.ceil(totalProducts / options.limit);
  const startIndex = (options.page - 1) * options.limit;

  return {
    products: matchingProducts.slice(startIndex, startIndex + options.limit),
    totalProducts,
    currentPage: options.page,
    totalPages,
  };
}

export function getFilterOptions() {
  const categories = [...validCategories].sort();
  return {
    categories,
    priceRange: { min: inventoryMinPrice, max: inventoryMaxPrice },
  };
}

