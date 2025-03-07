const productModel = require('../models/productModel')

// GET ALL PRODUCTS
const getAllProducts = async () => {
  return await productModel.find()
}

// GET PRODUCT BY ID
const getOneProduct = async (id) => {
  return await productModel.findById(id)
}

// CREATE PRODUCT
const createProduct = async (nombre, descripcion, precio, stock, categoria, urlImagenes) => {
  // VERIFICAR SI EL PRODUCTO YA EXISTE
  const existingProduct = await productModel.findOne({ nombre })
  if (existingProduct) {
    throw new Error('El Producto Ya Esta Registrado')
  }
  // CREAR EL NUEVO PRODUCTO
  const newproduct = await productModel.create({ nombre, descripcion, precio, stock, categoria, urlImagenes })
  await newproduct.save()
  return newproduct
}

// UPDATE PRODUCT BY ID
const updateProduct = async (id, nombre, descripcion, precio, stock, categoria, urlImagenes) => {
  return await productModel.findByIdAndUpdate(id, { nombre, descripcion, precio, stock, categoria, urlImagenes }, { new: true })
}

// DELETE PRODUCT BY ID
const deleteProduct = async (id) => {
  return await productModel.findByIdAndDelete(id)
}

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct
}