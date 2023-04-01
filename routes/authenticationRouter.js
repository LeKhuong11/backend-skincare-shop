const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController')


authRouter.post('/login', authController.login)
authRouter.post('/register', authController.registerUser)
authRouter.post('/change-avatar/:id', authController.changeAvatar)
authRouter.put('/change-password-user/:id', authController.changePassword)

module.exports = authRouter
