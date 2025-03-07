const cartModel = require('../models/cartModel')

// OBTENER CARRITO DE UN USUARIO
const getCart = async (userId) => {
  return await cartModel.findOne({ userId }).populate('items.productId')
}

// AGREGAR PRODUCTOS AL CARRITO
const addToCart = async (userId, items) => {
  let cart = await cartModel.findOne({ userId })

  if (!cart) {
    cart = new cartModel({
      userId,
      items: items.map(item => ({
        productId: item.productId,
        cantidad: item.cantidad
      }))
    })
  } else {
    // Procesar cada item del array
    for (const item of items) {
      const existingItem = cart.items.find(
        cartItem => cartItem.productId.toString() === item.productId
      )

      if (existingItem) {
        existingItem.cantidad += item.cantidad
      } else {
        cart.items.push({
          productId: item.productId,
          cantidad: item.cantidad
        })
      }
    }
  }

  await cart.save()
  return cart
}

/* ACTUALIZAR */

// ELIMINAR PRODUCTO DEL CARRITO
const removeFromCart = async (userId, productId) => {
  const cart = await cartModel.findOne({ userId })

  if (!cart) throw new Error('El Carrito No Existe')

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  )
  await cart.save()
  return cart
}

// VACIAR CARRITO
const clearCart = async (userId) => {
  const result = await cartModel.findOneAndDelete({ userId })
  if (!result) {
    throw new Error('El Carrito No Existe')
  }
  return { message: 'Carrito Vaciado' }
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
}