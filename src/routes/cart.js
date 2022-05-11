import express from "express";
import cartController from '../controllers/carts.js'
const router = express.Router();

router.post('/', cartController.saveCart);
router.put('/:cid', cartController.updateCart);
router.get('/:cid', cartController.getById);
router.post('/:cid/products/:pid', cartController.addProduct);  
router.delete('/:cid/products/:pid', cartController.deleteProduct);
router.post('/purchase/:cid', cartController.confirmPurchase)


export default router;