const multer = require('multer');
const path = require('path');
const fs = require('fs');

const environment = require(path.join(__dirname, './environment'));
const config = require(path.join(__dirname, './config.json'))[environment];

module.exports = (req, res, next) => {
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './webdata_tmp/');
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
    limits: { fileSize: 1024 * 1024 * 300 }
  }).any()(req, res, function (err) {
    if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
      if (err.code == 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          result: false,
          message: err.error,
          error: err,
          title: 'error'
        })
      } else {
        return res.status(500).json({
          result: false,
          message: err.error,
          error: err,
        })
      }
    } else if (err) { // An unknown error occurred when uploading.
      return res.status(500).json({
        result: false,
        message: err
      })
    }
    //Everything is ok
    next()
  });
}
