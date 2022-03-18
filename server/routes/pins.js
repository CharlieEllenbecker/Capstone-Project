const { Pin, validate } = require('../models/pin');
const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    GET - Get all pins
*/
router.get('/', auth, async (req, res) => {
    const pins = await Pin.find({});    // TODO: within a certain range?
    return res.status(200).send(pins);
});

/*
    POST - Add a new pin
*/
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const pinByTitle = await Pin.findOne({ title: req.body.title });
    if(pinByTitle) {
        return res.status(400).send('Pin already exists using that title.');
    }

    const pinByCoordinate = await Pin.findOne({ coordinate: req.body.coordinate });
    if(pinByCoordinate) {
        return res.status(400).send('Pin already exists using that location.'); // TODO: might want to make it within a certain range? => "A pin already exists near by."
    }

    const pin = await new Pin(_.pick(req.body, ['coordinate', 'title', 'description', 'tags', 'reviews'])).save();

    return req.status(200).send(pin);
});

module.exports = router;