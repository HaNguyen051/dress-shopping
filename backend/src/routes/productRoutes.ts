import express from 'express';
import * as productController from '../controllers/productController';

const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/', productController.getAllProducts);

// Lấy 1 sản phẩm theo id
router.get('/:id', productController.getProductById);

// Tạo sản phẩm mới
router.post('/', productController.createProduct);

// Cập nhật sản phẩm theo id
router.put('/:id', productController.updateProduct);

// Xóa sản phẩm theo id
router.delete('/:id', productController.deleteProduct);

export default router;
