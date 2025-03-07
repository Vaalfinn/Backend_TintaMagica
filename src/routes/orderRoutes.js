const express = require('express');
const router = express.Router();
const orderController = require ('../controllers/orderController');
const authenticateUser  = require('../middlewares/authMiddleware');

router
    .get('/', authenticateUser, orderController.getOrders)
    .get('/:id', authenticateUser, orderController.getOrderById)
    .post('/', authenticateUser, orderController.createOrder)
    .patch('/:id', authenticateUser, orderController.updateOrderStatus)
    .delete('/:id', authenticateUser, orderController.deleteOrder);

module.exports = router;