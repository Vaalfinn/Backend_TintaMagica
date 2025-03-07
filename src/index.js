/* INDEX */
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const connection = require('./config/dbConnection')
connection()

/* AGREGAR CORS PARA LAS COOKIES */

// INICIALIZAR EXPRESS
const app = express()
//
app.use(helmet())
const PORT = process.env.PORT || 3000

// LÍMITE DE PETICIONES
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
})

// IMPORTAR RUTAS
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const searchRoutes = require('./routes/searchRoutes')

app.use(limiter)
app.use(cors())
app.use(bodyParser.json())

// RUTA DE BIENVENIDA
app.get('/', (req, res) => {
  res.send('Bienvenido a TintaMaGICA')
})

// RUTAS DE APIS
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/search', searchRoutes)

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto http://localhost:${PORT}`)
})

// RUTAS QEU NO EXISTEN
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada')
})