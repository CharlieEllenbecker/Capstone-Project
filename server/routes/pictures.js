const fs = require('fs');
const auth = require('../middleware/auth');
const express = require('express');
require('express-async-errors');
const router = express.Router();


/*
    POST - Store post picture on the server
*/
router.post('/', auth, (req, res) => {
    const buff = Buffer.from(req.body.base64, 'base64');
    const pictureFileName = `${Date.now()}-${req.body.fileName}`;
    const directoryPath = (req.body.isTest) ? './tests/testUploadedImages/' : './images/';

    fs.writeFile(`${directoryPath}${pictureFileName}`, buff, function(err) {
        if(err) {
            console.log('Pictures route writeFile Error:', err);
        }
    });

    return res.status(200).send({ pictureFileName: pictureFileName });
});

module.exports = router;