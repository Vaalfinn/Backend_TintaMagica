const express = require('express')
const router = express.Router()
const searchController = require('../controllers/searchController')

// Ruta para búsqueda de productos
router.get('/productos', searchController.search)

module.exports = router