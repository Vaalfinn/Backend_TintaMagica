const cartService = require("../services/cartService");

const getCart = async (userId) => {
  return await cartService.getCart(userId);
};

const addToCart = async (userId, productId, cantidad) => {
  return await cartService.addToCart(userId, productId, cantidad);
};

const removeFromCart = async (userId, productId) => {
  return await cartService.removeFromCart(userId, productId);
};

const clearCart = async (userId) => {
  return await cartService.clearCart(userId);
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};