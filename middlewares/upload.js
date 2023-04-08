const util = require("util");
const multer = require("multer");
const maxSize = 200 * 1024 * 1024;

let storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("img");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;