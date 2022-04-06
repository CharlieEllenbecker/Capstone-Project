const { upload } = require('../helpers/imageHelper');
const auth = require('../middleware/auth');
const decodeJwt = require('jwt-decode');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    GET - Get image
*/
router.get('/:fileName', async (req, res) => {      // auth / get profile picture = check if it is the correct user... ***
    return res.status(200).download(`./images/${req.params.fileName}`);
});

/*
    GET - Get all post images
*/
// router.get('/:pinId', async (req, res) =>)

module.exports = router;