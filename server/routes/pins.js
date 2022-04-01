const { Pin, validate } = require('../models/pin');
const auth = require('../middleware/auth');
const decodeJwt = require('jwt-decode');
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
    GET - Get all user specific pins
*/
router.get('/my', auth, async (req, res) => {
    const userId = decodeJwt(req.header('x-auth-token'))._id;
    const pins = await Pin.find({ userId: userId }).sort('title');

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

    req.body.userId = decodeJwt(req.header('x-auth-token'))._id;
    const pin = await new Pin(_.pick(req.body, ['coordinate', 'title', 'description', 'rating', 'tags', 'reviews', 'userId'])).save();

    return res.status(200).send(pin);
});

/*
    PUT - Update Pin
*/
router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let pin = await Pin.findById(req.params.id);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.id} does not exist or the pin can not be edited by this user.`);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    if(pin.userId.toString() !== userId) {
        return res.status(404).send(`The pin can not be edited by this user.`);
    }

    req.body.userId = userId;
    pin = await Pin.findByIdAndUpdate(req.params.id, _.pick(req.body, ['title', 'description', 'tags', 'userId']), { new: true });

    return res.status(200).send(pin);
});

module.exports = router;