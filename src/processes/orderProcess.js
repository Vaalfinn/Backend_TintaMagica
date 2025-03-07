const orderService = require('../services/orderService');

const getOrders = async() => {
    const orders = await orderService.getOrders();
    return orders;
};

const getOrderById = async(id) => {
    const order = await orderService.getOrderById(id);
    return order;
};

const createOrder = async(userId, productId, cantidad, precio, precioTotal, status, metodoPago) => {
    const order = await orderService.createOrder(userId, productId, cantidad, precio, precioTotal, status, metodoPago);
    return order;
};


const updateOrderStatus = async(id, status) => {
    const order = await orderService.updateOrderStatus(id, status);
    return order;
};

const deleteOrder = async(id) => {
    const order = await orderService.deleteOrder(id);
    return order;
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder,
};