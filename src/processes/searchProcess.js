const searchService = require('../services/searchService')

const processSearch = async (queryParams) => {
  try {
    const productos = await searchService.searchProducts(queryParams)
    return {
      success: true,
      data: productos
    }
  } catch (error) {
    throw new Error(`Error en el proceso de búsqueda: ${error.message}`)
  }
}

module.exports = {
  processSearch
}