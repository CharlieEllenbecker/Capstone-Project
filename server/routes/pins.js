const { Pin, validate } = require('../models/pin');
const auth = require('../middleware/auth');
const decodeJwt = require('jwt-decode');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    GET - Get all pins everywhere
*/
router.get('/', auth, async (req, res) => {
    const pins = await Pin.find({});

    return res.status(200).send(pins);
});

/*
    GET - Get all pins within a range of the users location
*/
router.get('/user-location/:lat/:lon', auth, async (req, res) => {
    const pins = await Pin.find({
        location: {
            $near: {
                $maxDistance: 16000,    // roughly 10 miles in meters
                $geometry: {
                    type: 'Point',
                    coordinates: [req.params.lat, req.params.lon]
                }
            }
        }
    });

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
    GET - Get a specific pin by id
*/
router.get('/:pinId', auth, async (req, res) => {
    const pin = await Pin.findById(req.params.pinId);
    
    return res.status(200).send(pin);
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

    const pinByCoordinate = await Pin.findOne({ location: req.body.location });
    if(pinByCoordinate) {
        return res.status(400).send('Pin already exists using that location.'); // TODO: might want to make it within a certain range? => "A pin already exists near by."
    }

    req.body.userId = decodeJwt(req.header('x-auth-token'))._id;
    const pin = await new Pin(_.pick(req.body, ['location', 'title', 'description', 'rating', 'tags', 'userId'])).save();

    return res.status(200).send(pin);
});

/*
    POST - Add a new pin while checking for near-by existing pins
*/
router.post('/location', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const pinByTitle = await Pin.findOne({ title: req.body.title });
    if(pinByTitle) {
        return res.status(400).send('Pin already exists using that title.');
    }

    const pinByCoordinate = await Pin.findOne({
        location: {
            $near: {
                $maxDistance: 200,    // 200 meters
                $geometry: {
                    type: 'Point',
                    coordinates: [req.body.location.coordinates[0], req.body.location.coordinates[1]]   // [lat, lon]
                }
            }
        }
    });
    if(pinByCoordinate) {
        return res.status(400).send('Pin already exists using that location.'); // TODO: might want to make it within a certain range? => "A pin already exists near by."
    }

    req.body.userId = decodeJwt(req.header('x-auth-token'))._id;
    const pin = await new Pin(_.pick(req.body, ['location', 'title', 'description', 'rating', 'tags', 'userId'])).save();

    return res.status(200).send(pin);
});

/*
    PUT - Update Pin
*/
router.put('/:pinId', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    if(pin.userId.toString() !== userId) {
        return res.status(404).send(`The pin can not be edited by this user.`);
    }

    req.body.userId = userId;
    pin = await Pin.findByIdAndUpdate(req.params.pinId, _.pick(req.body, ['title', 'description', 'tags', 'userId']), { new: true });

    return res.status(200).send(pin);
});

module.exports = router;