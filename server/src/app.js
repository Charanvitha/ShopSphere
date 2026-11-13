import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/health', (_request, response) => response.json({ success: true, status: 'ok' }));
app.use('/api/products', productRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
