import { getFilterOptions, getProducts } from '../services/productService.js';

export function listProducts(request, response, next) {
  try {
    response.json({ success: true, ...getProducts(request.query) });
  } catch (error) {
    next(error);
  }
}

export function listFilterOptions(_request, response) {
  response.json({ success: true, ...getFilterOptions() });
}
