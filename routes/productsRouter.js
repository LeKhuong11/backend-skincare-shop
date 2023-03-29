const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController')

productRouter.get('/products', productController.getAll)
productRouter.get('/products/:id', productController.getOne)
productRouter.post('/products', productController.postOne)
productRouter.put('/products/:id', productController.updateOne)
productRouter.delete('/products/:id', productController.deleteOne)

module.exports = productRouter
