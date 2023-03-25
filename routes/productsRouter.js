const express = require('express');
const router = express.Router();
const controller = require('./features')

router.get('/products', controller.getAll)
router.get('/products/:id', controller.getOne)
router.get("/files", controller.getListFiles);
router.get("/files/:name", controller.download);
router.post('/uploads', controller.upload)
router.post('/products', controller.postOne)
router.put('/products/:id', controller.updateOne)
router.delete('/products/:id', controller.deleteOne)

module.exports = router
