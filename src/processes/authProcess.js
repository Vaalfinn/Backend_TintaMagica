/* AUTH PROCESS */
const authService = require('../services/authService')

/* AUTHENTICATION */
// REGISTER USER CON CONTRASEÑA HASHEADA
const registerUser = async (nombre, email, password) => {
  const user = await authService.registerUser(nombre, email, password)
  return user
}

// LOGIN USER
const loginUser = async (email, password) => {
  const result = await authService.loginUser(email, password)
  return result
}

// ENVIAR CÓDIGO DE VERIFICACIÓN
const sendVerificationCode = async (email) => {
  const result = await authService.sendVerificationCode(email)
  return result
}

// VERIFICAR CÓDIGO
const verifyCode = async (email, code) => {
  const result = await authService.verifyCode(email, code)
  return result
}

// SOLICITAR RESTABLECIMIENTO DE CONTRASEÑA
const requestPasswordReset = async (email) => {
  const result = await authService.requestPasswordReset(email)
  return result
}

// RESTABLECER CONTRASEÑA
const resetPassword = async (token, newPassword) => {
  const result = await authService.resetPassword(token, newPassword)
  return result
}

module.exports = {
  registerUser,
  loginUser,
  sendVerificationCode,
  verifyCode,
  requestPasswordReset,
  resetPassword
}