const { upload } = require('../middleware/imageHelper');
const auth = require('../middleware/auth');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    POST - Store post picture on the server
*/
router.post('/', [auth, upload.single('image')], async (req, res) => {
    return res.status(200).send({ pictureFileName: req.file.filename })
});

module.exports = router;