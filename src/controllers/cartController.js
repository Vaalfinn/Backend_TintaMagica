const cartProcess = require("../processes/cartProcess");

// OBTENER CARRITO
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await cartProcess.getCart(userId);

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Carrito No Encontrado" });
    }

    res.status(200).json({ success: true, message: "Carrito Obtenido", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Interno Del Servidor"});
  }
};

// AGREGAR PRODUCTO AL CARRITO
const addToCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false, 
        message: "Se requiere un array de productos"
      });
    }

    // Validar cada item
    for (const item of items) {
      if (!item.productId || !item.cantidad) {
        return res.status(400).json({
          success: false,
          message: "Cada item debe tener productId y cantidad"
        });
      }
    }

    const cart = await cartProcess.addToCart(userId, items);
    res.status(200).json({ 
      success: true, 
      message: "Productos Agregados Al Carrito", 
      cart 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error Interno Del Servidor" 
    });
  }
};

// ELIMINAR PRODUCTO DEL CARRITO
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "ID Del Producto Es Obligatorio" });
    }

    const cart = await cartProcess.removeFromCart(userId, productId);
    res.status(200).json({ success: true, message: "Producto Eliminado Del Carrito", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Interno Del Servidor"});
  }
};

// VACIAR CARRITO
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await cartProcess.clearCart(userId);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(error.message === "El Carrito No Existe" ? 404 : 500)
      .json({ success: false, message: "Error Interno Del Servidor" });
  }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
};