const orderModel = require('../models/orderModel')
const cartModel = require('../models/cartModel')
const productModel = require('../models/productModel')

// OBTENER TODAS LAS ORDENES
const getOrders = async () => {
  return await orderModel.find()
    .populate('userId', 'nombre email')
    .populate('items.productId', 'nombre precio')
}

// OBTENER UNA ORDEN POR ID
const getOrderById = async (id) => {
  return await orderModel.findById(id)
    .populate('userId', 'nombre email')
    .populate('items.productId', 'nombre precio')
}

// CREAR UNA ORDEN A PARTIR DEL CARRITO
const createOrder = async (userId, metodoPago) => {
  try {
    // 1. Obtener el carrito del usuario
    const cart = await cartModel.findOne({ userId }).populate('items.productId')
    if (!cart || cart.items.length === 0) {
      throw new Error('Carrito vacío o no encontrado')
    }

    // 2. Calcular el precio total y preparar los items
    let precioTotal = 0
    const orderItems = []

    for (const item of cart.items) {
      const product = await productModel.findById(item.productId)

      // Verificar stock
      if (product.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para ${product.nombre}`)
      }

      // Actualizar stock
      await productModel.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.cantidad } }
      )

      // Calcular subtotal para este item
      const precioUnitario = product.precio
      const subtotal = precioUnitario * item.cantidad
      precioTotal += subtotal

      orderItems.push({
        productId: item.productId._id,
        cantidad: item.cantidad,
        precio: precioUnitario,
        subtotal
      })
    }

    // 3. Crear la orden
    const newOrder = new orderModel({
      userId,
      items: orderItems,
      precioTotal,
      status: 'Pendiente',
      metodoPago
    })

    await newOrder.save()

    // 4. Vaciar el carrito
    await cartModel.findOneAndDelete({ userId })

    return newOrder
  } catch (error) {
    throw new Error(`Error al crear la orden: ${error.message}`)
  }
}

// ACTUALIZAR EL ESTADO DE UNA ORDEN
const updateOrderStatus = async (id, status) => {
  return await orderModel.findByIdAndUpdate(id, { status }, { new: true })
}

// ELIMINAR UNA ORDEN
const deleteOrder = async (id) => {
  return await orderModel.findByIdAndDelete(id)
}

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
}