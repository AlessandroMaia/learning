import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { deleteOrder } from './app/useCases/orders/deleteOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// Category
router.get('/categories', listCategories);
router.post('/categories', createCategory);
router.get('/categories/:categoryId/products', listProductsByCategory);

// Product
router.get('/products', listProducts);
router.post('/products', upload.single('image'), createProduct);

// Order
router.get('/orders', listOrders);
router.post('/orders', createOrder);
router.patch('/orders/:orderId', changeOrderStatus);
router.delete('/orders/:orderId', deleteOrder);
