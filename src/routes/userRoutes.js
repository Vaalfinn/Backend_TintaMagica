const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticateUser = require('../middlewares/authMiddleware'); 

router
  .get('/', userController.getAllUsers)
  .get('/:id', userController.getOneUser)
  .post('/', userController.createUser)
  .patch('/:id', authenticateUser, userController.updateUser)
  .delete('/:id', authenticateUser, userController.deleteUser)

module.exports = router