const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure multer middleware for handling multipart/form-data
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
}).single('image');

// define API endpoint for handling POST requests
app.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      res.status(400).send(err);
    } else {
      const data = {
        title: req.body.title,
        description: req.body.description,
        imagePath: req.file.path
      };
      res.status(200).send(data);
    }
  });
});

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
