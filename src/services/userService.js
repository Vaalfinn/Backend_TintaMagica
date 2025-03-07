const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')

// GET ALL USERS
const getAllUsers = async () => {
  return await userModel.find()
}

// GET USER BY ID
const getOneUser = async (id) => {
  return await userModel.findById(id)
}

// CREATE USER (SIN HASHEAR LA CONTRASEÑA)
const createUser = async (nombre, email, password) => {
  // VERIFICAR SI EL EMAIL YA EXISTE
  const existingUser = await userModel.findOne({ email })
  if (existingUser) {
    throw new Error('El Email Ya Está Registrado')
  }
  // CREAR EL NUEVO USUARIO
  const newUser = new userModel({ nombre, email, password })
  await newUser.save()
  return newUser
}

// UPDATE USER BY ID
const updateUser = async (id, nombre, email, password) => {
  // HASHEAR LA CONTRASEÑA SOLO SI SE PROPORCIONA UNA NUEVA
  let hashedPassword = userModel.password
  if (password) {
    const salt = await bcrypt.genSalt(10)
    hashedPassword = await bcrypt.hash(password, salt)
  }
  // ACTUALIZAR EL USUARIO
  return await userModel.findByIdAndUpdate(
    id,
    { nombre, email, password: hashedPassword },
    { new: true }
  )
}

// DELETE USER BY ID
const deleteUser = async (id) => {
  return await userModel.findByIdAndDelete(id)
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}