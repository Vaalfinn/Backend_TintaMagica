const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

// FUNCIÓN PARA ENVIAR CORREOS
const sendEmail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        }

        const info = await transporter.sendMail(mailOptions)
        console.log('Correo enviado: ', info.response)
        return { success: true, message: 'Correo enviado correctamente' }
    } catch (error) {
        console.error('Error al enviar el correo:', error)
        return { success: false, message: 'Error al enviar el correo' }
    }
}

module.exports = { sendEmail }