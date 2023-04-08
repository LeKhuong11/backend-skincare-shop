const express = require('express');
const sendMailForgotPasswordRouter = express.Router();
const sendMailForgotPassword = require('../controllers/sendMailForgotPasswordController')

sendMailForgotPasswordRouter.post('/send-mail', sendMailForgotPassword.sendMail)

module.exports = sendMailForgotPasswordRouter