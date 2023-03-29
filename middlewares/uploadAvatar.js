const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadAvatar = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("avatar");

let uploadFileMiddleware = util.promisify(uploadAvatar);
module.exports = uploadFileMiddleware;