// const { upload } = require('../middleware/imageHelper');
// const auth = require('../middleware/auth');
// const express = require('express');
// require('express-async-errors');
// const router = express.Router();

// /*
//     POST - Store post picture on the server
// */
// router.post('/', [auth, upload.single('image')], async (req, res) => {
//     return res.status(200).send({ pictureFileName: req.file.filename })
// });

// module.exports = router;

const auth = require('../middleware/auth');
const express = require('express');
require('express-async-errors');
const router = express.Router();

const multer = require('multer')
const upload = multer().single('image')

/*
    POST - Store post picture on the server
*/
router.post('/', [auth], async (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('1', err);
        } else if (err) {
            console.log('2', err);
        }
    
        // Everything went fine.
    });

    return res.status(200).send({ pictureFileName: req.file.filename });
});

module.exports = router;