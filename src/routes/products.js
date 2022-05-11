import express from "express";
import uploader from "../utils/uploader.js";
import productController from '../controllers/products.js';

const router = express.Router();
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getById);
router.post('/', uploader.single('thumbnail'), productController.saveProduct)
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;