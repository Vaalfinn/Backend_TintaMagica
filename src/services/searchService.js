const Product = require('../models/productModel')

const searchProducts = async (query) => {
  try {
    const searchCriteria = {}

    // Si hay un término de búsqueda, buscar en nombre y descripción
    if (query.term) {
      searchCriteria.$or = [
        { nombre: { $regex: query.term, $options: 'i' } },
        { descripcion: { $regex: query.term, $options: 'i' } }
      ]
    }

    // Filtrar por categoría si se especifica
    if (query.categoria) {
      searchCriteria.categoria = query.categoria
    }

    // Filtrar por rango de precios
    if (query.precioMin || query.precioMax) {
      searchCriteria.precio = {}
      if (query.precioMin) searchCriteria.precio.$gte = Number(query.precioMin)
      if (query.precioMax) searchCriteria.precio.$lte = Number(query.precioMax)
    }

    // Filtrar solo productos con stock disponible
    if (query.disponible) {
      searchCriteria.stock = { $gt: 0 }
    }

    const productos = await Product.find(searchCriteria)
      .sort(query.sortBy || 'nombre')
      .limit(Number(query.limit) || 10)
      .skip(Number(query.skip) || 0)

    return productos
  } catch (error) {
    throw new Error(`Error en la búsqueda de productos: ${error.message}`)
  }
}

module.exports = {
  searchProducts
}