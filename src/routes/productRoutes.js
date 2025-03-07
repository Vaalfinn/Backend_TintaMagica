const express = require('express');
const router = express.Router();
const productController = require ('../controllers/productController');
const authenticateUser = require('../middlewares/authMiddleware');

router
    .get('/', productController.getAllProducts)
    .get('/:id', productController.getOneProduct)
    .post('/', authenticateUser, productController.createProduct)
    .patch('/:id', authenticateUser, productController.updateProduct)
    .delete('/:id', authenticateUser, productController.deleteProduct);

module.exports = router;