// const path = require('path');
// const multer = require('multer');

// const storate = multer.diskStorage({
//     destination: (req, file, cb ) => {
//         cb(null, 'uploads/')
//     },
//     filename: (req, file, cb) => {
//         let ext = path.extname(file.originalname)
//         cb(null, Date.now() + ext)
//     }
// })

// const upload = multer({
//     storage: storate,
//     fileFilter: (req, file, callback) => {
//         if(file.mimetype == "image/png" || file.mimetype == "image/jpg") {
//             console.log(123);
//             callback(null, true)
//         }
//         else {
//             console.log('only jpg and png file supported!');
//             callback(null, false)
//         }
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2
//     }
// })

// module.exports = upload

const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

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