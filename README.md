# TintaMAGICA

# Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js
- MongoDB

## Dependecias

Instalar las siguientes dependencias para su funcionamiento:

- `npm install express` - Framework web para Node.js (GET, POST, DELETE, PUT, PATCH)
- `npm install cors` - Permite solicitudes desde distintos dispositivos
- `npm install nodemon -D` - Recarga automáticamente el servidor en desarrollo
- `npm install mongoose` - Para hacer la conexión a la base de datos
- `npm install mongoose-unique-validator --legacy-peer-deps` - Plugin para Mongoose que mejora los mensajes de error en campos unique.
- `npm install body-parser` - Convierte datos a JSON
- `npm install dotenv --save` - Manejo de variables de entorno
- `npm install bcryptjs` - Encriptación de contraseñas
- `npm install jsonwebtoken` - Generación de tokens JWT
- `npm install express-rate-limit` - Limita el número de peticiones a la API
- `npm install helmet` - Protege la APP de vulnerabilidades de XSS
- `npm install winston` - Registra errores sin exponer información sensible
- `npm install audit` - Identifica vulberabilidades
- `npm install standard --save-dev` - Asegura la consistncia y calidad del código
- `npm install nodemailer` - Enviar correos electrónicos

## Endpoints

### User

| Método | Endpoint        | Descripción                |
| ------ | --------------- | -------------------------- |
| GET    | `/api/user`     | Obtiene todos los usuarios |
| GET    | `/api/user/:id` | Obtiene un usuario por ID  |
| POST   | `/api/user`     | Crea un nuevo usuario      |
| PATCH  | `/api/user/:id` | Actualiza un usuario       |
| DELETE | `/api/user/:id` | Elimina un usuario         |

### Auth

| Método | Endpoint             | Descripción         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Registra un usuario |
| POST   | `api/auth/login`     | Logea un usuario    |

### Product

| Método | Endpoint           | Descripción                 |
| ------ | ------------------ | --------------------------- |
| GET    | `/api/product`     | Obtiene todos los productos |
| GET    | `/api/product/:id` | Obtiene un producto por ID  |
| POST   | `/api/product`     | Crea un nuevo producto      |
| PATCH  | `/api/product/:id` | Actualiza un producto       |
| DELETE | `/api/product/:id` | Elimina un producto         |

### Cart

| Método | Endpoint           | Descripción                      |
| ------ | ------------------ | -------------------------------- |
| GET    | `/api/cart`        | Obtiene el carrito de un usuario |
| POST   | `/api/cart/add`    | Agrega un producto al carrito    |
| DELETE | `/api/cart/remove` | Elimina un producto del carrito  |
| DELETE | `/api/cart/clear`  | Vacía el carrito                 |

### Order

| Método | Endpoint         | Descripción               |
| ------ | ---------------- | ------------------------- |
| GET    | `/api/order`     | Obtiene todas las ordenes |
| GET    | `/api/order/:id` | Obtiene una orden por ID  |
| POST   | `/api/order`     | Crea una nueva orden      |
| PATCH  | `/api/order/:id` | Actualiza una orden       |
| DELETE | `/api/order/:id` | Elimina una orden         |

### Review

| Método | Endpoint          | Descripción               |
| ------ | ----------------- | ------------------------- |
| GET    | `/api/review`     | Obtiene todos las reseñas |
| GET    | `/api/review/:id` | Obtiene una reseña por ID |
| POST   | `/api/review`     | Crea una nueva reseña     |
| PATCH  | `/api/review/:id` | Actualiza una reseña      |
| DELETE | `/api/review/:id` | Elimina una reseña        |

### Search

## Seguridad

- Se usa **bcryptjs** para encriptar contraseñas.
- Se usa **JWT (jsonwebtoken)** para autenticar usuarios.
- Se usa **helmet** para proteger la app de ataques XSS.
- Se usa **express-rate-limit** para limitar el número de peticiones a la API.
- Se usa **winston** para registrar errores sin exponer información sensible.
