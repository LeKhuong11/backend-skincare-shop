const express = require('express');
const router = express.Router();
const controller = require('./features')
const multer = require('multer');
const Product = require('../models/productsModels')
const uploadFile = require("../middlewares/upload");
const baseUrl = 'http://localhost:3000/api/files/';

router.get('/products', controller.getAll)
router.get('/products/:id', controller.getOne)
router.get("/files", controller.getListFiles);
router.get("/files/:name", controller.download);
router.post('/uploads', controller.upload)
router.post('/products', controller.postOne)
router.put('/products/:id', controller.updateOne)
router.delete('/products/:id', controller.deleteOne)

module.exports = router
