const fs = require('fs')
const Product = require('../models/productsModels')
const uploadFile = require("../middlewares/upload");
const cloudinary = require('../utils/cloudinary');

const productController = {
    //get all products
    getAll: async (req, res) => {
        try {
            const product = await Product.find();
            res.status(200).json(product)
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    },
    
    //get a product by id
    getOne:  async (req, res) => {
        const id = req.params.id;
        try {
            const product = await Product.findById(id);
            res.status(200).json(product)
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    },

    //post product
    postOne: async (req, res) => {
        const data = req.body
        try {
            await uploadFile(req, res);
            if(req.file) {
                const resultClodinary = cloudinary.uploader.upload(req.file.path);
                data.img = {
                  public_id:  (await resultClodinary).public_id,
                  url: (await resultClodinary).secure_url
                }
              }
            const product = await Product.create(data);
            res.status(200).json(product)
        } catch(err) {
            res.status(500).json({message: err.message})
        } 
    },

    //update product by id
    updateOne: async (req, res) => {
        const id = req.params.id;
        const data = req.body
        try {
          await uploadFile(req, res);
          if(req.file) {
            const resultClodinary = cloudinary.uploader.upload(req.file.path);
            data.img = {
              public_id:  (await resultClodinary).public_id,
              url: (await resultClodinary).secure_url
            }
          }
          const product = await Product.findByIdAndUpdate(id, data);
          product.img = data?.img
          res.status(200).json(product)
        } catch(err) {
            res.status(500).json({message: err.message})
        }
    },

    //delete product by id
    deleteOne: async (req, res) => {
        const id = req.params.id;
        try {
            await Product.findByIdAndDelete(id);
            res.status(200).json({message: "Delete susscessfully!"})
        } catch(err) {
            res.status(500).json({message: err.message})
        }
      }
}

module.exports = productController