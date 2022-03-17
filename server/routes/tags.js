const auth = require('../middleware/auth');
const config = require('config');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    GET - Get tags
*/
router.get('/', auth, async(req, res) => {
    return res.status(200).send(config.get('tags'));
});