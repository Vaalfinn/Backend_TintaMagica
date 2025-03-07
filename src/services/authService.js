/* AUTH SERVICE */
const UserModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sendEmail } = require('./emailService')

/* AUTHENTICATION */
// REGISTER USER
const registerUser = async (nombre, email, password) => {
  try {
    // VERIFICAR SI EL EMAIL YA EXISTE
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      throw new Error('El Email Ya Está Registrado')
    }

    // HASHEAMOS LA CONTRASEÑA
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // CREAR NUEVO USUARIO
    const newUser = new UserModel({ nombre, email, password: hashedPassword })

    // Enviar Correo de Bienvenida
    const subject = 'Bienvenido CrochetCraft'
    const text = `Hola ${nombre}, gracias por registrarte en nuestra tienda.`
    const html = `<h1>Hola ${nombre}!</h1><p>Bienvenido a nuestra tienda en línea. Gracias por registrarte.</p>`
    await sendEmail(email, subject, text, html)

    await newUser.save()
    return newUser
  } catch (error) {
    throw new Error(`Error En El registro: ${error.message}`)
  }
}

// LOGIN USER
const loginUser = async (email, password) => {
  try {
    // VERIFICAR SI EL USUARIO EXISTE
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new Error('El Usuario No Existe')
    }

    // VERIFICAR SI LA CONTRASEÑA ES CORRECTA
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Contraseña Incorrecta')
    }

    return user
  } catch (error) {
    throw new Error(`Error En El Login: ${error.message}`)
  }
}

// ENVIAR CÓDIGO DE VERIFICACIÓN
const sendVerificationCode = async (email) => {
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw new Error('Usuario No Encontrado')
  }

  // GENERAR CÓDIGO DE 6 DÍGITOS DE MANERA SEGURA
  const verificationCode = Math.floor(100000 + crypto.randomBytes(4).readUInt32LE(0) % 900000).toString()
  user.verificationCode = verificationCode
  await user.save()

  await sendEmail(user.email, 'Código de Verificación',
    `Tu código de verificación es: ${verificationCode}`,
    `<h1>Código de Verificación</h1><p>Tu código es: <b>${verificationCode}</b></p>`
  )

  return { verificationCode }
}

// VERIFICAR CÓDIGO
const verifyCode = async (email, code) => {
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw new Error('Usuario No Encontrado')
  }

  if (user.verificationCode !== code) {
    throw new Error('Código Inválido')
  }

  const subject = 'Cuenta Verificada Exitosamente',
    text = 'Tu cuenta ha sido verificada con éxito',
    html = '<h1>Cuenta Verificada</h1><p>Tu cuenta ha sido verificada con éxito</p>'
  await sendEmail(user.email, subject, text, html)

  user.verified = true
  user.verificationCode = null
  await user.save()

  return user
}

// SOLICITAR RESTABLECIMIENTO DE CONTRASEÑA
const requestPasswordReset = async (email) => {
  try {
    const user = await UserModel.findOne({ email })
    if (!user) throw new Error('Usuario no encontrado')

    // Generar token de restablecimiento (expira en 1 hora)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = Date.now() + 3600000 // 1 hora
    await user.save()

    // Enviar correo con el enlace
    const resetLink = `http://localhost:3000/api/auth/reset-password/${resetToken}`

    // PRUEBAS
    /*     console.log('Reset Token:', resetToken);
        console.log('Reset Link:', resetLink); */

    const subject = 'Restablecimiento de Contraseña'
    const text = `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`
    const html = `<h1>Restablecer Contraseña</h1><p><a href="${resetLink}">Haz clic aquí</a> para restablecer tu contraseña. El enlace expira en 1 hora.</p>`

    await sendEmail(user.email, subject, text, html)
    return {
      success: true,
      message: 'Correo De Restablecimiento Enviado'
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

// RESTABLECER CONTRASEÑA
const resetPassword = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findById(decoded.id)

    if (!user || user.resetPasswordToken !== token) {
      throw new Error('Token Inválido O Expirado')
    }

    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)


    const subject = 'Contraseña Restablecida Con Éxito',
      text = 'Tu contraseña ha sido restablecida con éxito',
      html = '<h1>Contraseña Restablecida</h1><p>Tu contraseña ha sido restablecida con éxito</p>'
    await sendEmail(user.email, subject, text, html)

    // Limpiar token de restablecimiento
    user.resetPasswordToken = null
    user.resetPasswordExpires = null
    await user.save()

    return { success: true, message: 'Contraseña Restablecida Con Éxito' }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  registerUser,
  loginUser,
  sendVerificationCode,
  verifyCode,
  requestPasswordReset,
  resetPassword
}