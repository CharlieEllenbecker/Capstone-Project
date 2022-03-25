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
    const username = decodeJwt(req.header('x-auth-token')).username;
    const pins = await Pin.find({ username: username }).sort('title');

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

    req.body.username = decodeJwt(req.header('x-auth-token')).username;
    const pin = await new Pin(_.pick(req.body, ['coordinate', 'title', 'description', 'rating', 'tags', 'reviews', 'username'])).save();

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

    const username = decodeJwt(req.header('x-auth-token')).username;
    if(pin.username !== username) {
        return res.status(404).send(`The pin with can not be edited by this user.`);
    }

    pin = await Pin.findByIdAndUpdate(req.params.id, _.pick(req.body, ['title', 'description', 'tags']), { new: true });

    return res.status(200).send(pin);
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

    const username = decodeJwt(req.header('x-auth-token')).username;
    if(pin.reviews.some(r => r.username === username)) {
        return res.status(400).send(`The pin with the given id ${req.params.pinId} already contains a review from that user.`);
    }

    pin.rating = (pin.rating + req.body.rating) / (pin.reviews.length + 1);
    req.body.username = username;
    pin.reviews.push(req.body);
    pin = await pin.save();

    return res.status(200).send(pin);
});

/*
    PUT - Update a review on a pin
*/
router.put('/:reviewId/:pinId', auth, async (req, res) => {
    const { error } = validateReview(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    const review = await pin.review.id(req.params.reviewId);
    const username = decodeJwt(req.header('x-auth-token')).username;
    if(!review || review.username !== username) {
        return res.status(400).send(`The pin with the given id ${req.params.pinId} does not contain the review with the given reviewId ${req.params.reviewId} or from that from that user.`);
    }

    req.body.username = username
    review.set(_.pick(req.body, ['username', 'description', 'rating']));
    await review.save();

    pin = await Pin.findById(req.params.pinId);
    let sumRatings = 0;
    pin.reviews.forEach(r => sumRatings += r.rating);
    pin.rating = (sumRatings/ pin.reviews.length);
    pin = await pin.save;

    return res.status(200).send(pin);
}); // Might have been more efficient to iterate throught the reviews and replace it in there all while iterating the sum of ratings on each of those reviews then all when done just save the updated pin. Therefore the username probably would have been better to look at instead of the reviewId param...

/*
    DELETE - Delete a review from a pin
*/
router.delete('/review/:pinId', auth, async (req, res) => {
    let pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    const username = decodeJwt(req.header('x-auth-token')).username;
    if(pin.reviews.every(r => r.username !== username)) {
        return res.status(400).send(`The pin with the given id ${req.params.pinId} does not contain a review from that user.`);
    }

    const index = pin.reviews.findIndex(r => r.username === username);

    const updatedReviews = [...pin.reviews.slice(0, index), ...pin.reviews.slice(index + 1)];
    pin.reviews = updatedReviews;
    pin = pin.save();

    return res.status(200).send(pin)
});

module.exports = router;