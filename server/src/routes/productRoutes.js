import { Router } from 'express';
import { listFilterOptions, listProducts } from '../controllers/productController.js';

const productRoutes = Router();
productRoutes.get('/filters', listFilterOptions);
productRoutes.get('/', listProducts);

export default productRoutes;
