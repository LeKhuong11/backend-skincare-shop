const fs = require('fs')
const Product = require('../models/productsModels')
const uploadFile = require("../middlewares/upload");
const cloudinary = require('../utils/cloudinary');

const getAll = async (req, res) => {
  try {
      const product = await Product.find();
      res.status(200).json(product)
  } catch(err) {
      res.status(500).json({message: err.message})
  }
}

const getOne =  async (req, res) => {
  const id = req.params.id;
  try {
      const product = await Product.findById(id);
      res.status(200).json(product)
  } catch(err) {
      res.status(500).json({message: err.message})
  }
}

const postOne = async (req, res) => {
  const data = req.body
  try {
      await uploadFile(req, res);
      const resultClodinary = cloudinary.uploader.upload(req.file.path);
      data.img = {
        public_id:  (await resultClodinary).public_id,
        url: (await resultClodinary).secure_url
      }
      const product = await Product.create(data);
      res.status(200).json(product)
  } catch(err) {
      res.status(500).json({message: err.message})
  } 
}


const updateOne = async (req, res) => {
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
}

const deleteOne = async (req, res) => {
  const id = req.params.id;
  try {
      const product = await Product.findByIdAndDelete(id);
      res.status(200).json(product)
  } catch(err) {
      res.status(500).json({message: err.message})
  }
}

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "There was an issue in scanning the files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: 'http://localhost:3000/files/' + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  getAll,
  getOne,
  postOne,
  updateOne,
  deleteOne,
  upload,
  getListFiles,
  download,
};