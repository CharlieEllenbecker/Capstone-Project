const { Pin, validate } = require('../models/pin');
const { validateReview } = require('../models/review');
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
    const pins = await Pin.find({ userId: userId }).select(['-userId']).sort('title');

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
    const pin = await new Pin(_.pick(req.body, ['coordinate', 'title', 'description', 'rating', 'tags', 'reviews', 'userId'])).save().select(['-userId']);  // TODO: test that this select is working...

    console.log('Select: ' + pin);  // TEST...

    return req.status(200).send(pin);
});

/*
    PUT - Update Pin
*/
router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    const pin = await Pin.findByIdAndUpdate({ _id: req.params.id, userId: userId }, _.pick(req.body, ['coordinate', 'title', 'description', 'rating', 'tags', 'reviews', 'userId']), { new: true }).select(['-userId']);

    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.id} does not exist or the pin can not be edited by this user.`)
    }

    return res.status(200).send(folder);
});

/*
    POST - Add review to a pin
*/
router.post('/review/:pinId', auth, async (req, res) => {
    const { error } = validateReview(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    if(pin.reviews.some(r => r.userId === userId)) {
        return res.status(400).send(`The pin with the given id ${req.params.pinId} already contains a review from that user.`);
    }

    pin.reviews.push(req.body);
    pin = pin.save().select(['-userId']);

    return res.status(200).send(pin);
});

/*
    PUT - Update a review on a pin
*/
// TODO

/*
    DELETE - Delete a review from a pin
*/
// TODO

module.exports = router;