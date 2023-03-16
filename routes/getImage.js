const express = require('express');
const UploadSchema = require('../models/Upload')

const router = express.Router();

router.get('/', async (req, res) => {

    const getImages = await UploadSchema.find();

    if (!getImages) {
        return res.status(404).json({ message: "No Images Found" });
    }
    return res.status(200).json({ getImages });
})

module.exports = router;