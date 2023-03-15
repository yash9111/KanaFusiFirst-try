const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
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


router.post('/', function (req, res) {
    upload(req, res, function (err) {
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

module.exports = router;