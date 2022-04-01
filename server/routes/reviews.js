const { Pin } = require('../models/pin');
const { User } = require('../models/user');
const { validate } = require('../models/review');
const auth = require('../middleware/auth');
const decodeJwt = require('jwt-decode');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    GET - Get all reviews on a pin
*/
router.get('/:pinId', auth, async (req, res) => {
    const pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    const promises = [];
    const newReviews = [];
    pin.reviews.forEach(r => {
        promises.push(User.findById(r.userId).select(['-_id', '-email', '-password']));
    });

    const users = await Promise.all(promises);

    for(let i = 0; i < pin.reviews.length; i++) {
        const user = users[i];
        const r = pin.reviews[i].toObject();
        delete r.userId;
        r.user = user;
        newReviews.push(r);
    }

    return res.status(200).send(newReviews);
});

/*
    POST - Add review to a pin
*/
router.post('/:pinId', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    if(pin.reviews.some(r => r.userId.toString() === userId)) {
        return res.status(400).send(`The pin with the given id ${req.params.pinId} already contains a review from that user.`);
    }

    pin.rating = (pin.rating + req.body.rating) / (pin.reviews.length + 1);
    req.body.userId = userId;
    pin.reviews.push(req.body);
    await pin.save();

    req.body.user = await User.findById(userId).select(['-_id', '-email', '-password']);

    return res.status(200).send(req.body);  // return the review with the user data
});

/*
    PUT - Update a review on a pin
*/
router.put('/:pinId', auth, async (req, res) => {    // TODO: edit to use reviewId for faster query?
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;

    if(pin.reviews.every(r => r.userId.toString() !== userId)) {
        return res.status(400).send(`The pin with the given id ${req.params.pinId} does not contain a review from that user.`);
    }

    req.body.userId = userId;
    let reviewRatingSum = 0;
    const newReviews = [];
    pin.reviews.forEach(r => {
        if(r.userId.toString() === userId) {   // Assuming that there will only be one review per person on a pin
            newReviews.push(req.body);
            reviewRatingSum += req.body.rating;
        } else {
            newReviews.push(r);
            reviewRatingSum += r.rating;
        }
    });
    pin.reviews = newReviews;
    pin.rating = (reviewRatingSum / newReviews.length);
    await pin.save();

    req.body.user = await User.findById(userId).select(['-_id', '-email', '-password']);

    return res.status(200).send(req.body);  // return the updated review with the user data
});

/*
    DELETE - Delete a review from a pin
*/
router.delete('/:pinId', auth, async (req, res) => {
    const pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    if(pin.reviews.every(r => r.userId.toString() !== userId)) {
        return res.status(400).send(`The pin with the given id ${req.params.pinId} does not contain a review from that user.`);
    }

    let reviewRatingSum = 0;
    const newReviews = [];
    let deletedReview;
    pin.reviews.forEach(r => {
        if(r.userId.toString() !== userId) {   // Assuming that there will only be one review per person on a pin
            newReviews.push(r);
            reviewRatingSum += r.rating;
        } else {
            deletedReview = r;
        }
    });

    pin.reviews = newReviews;
    pin.rating = newReviews.length !== 0 ? (reviewRatingSum / newReviews.length) : 0;
    await pin.save();

    return res.status(200).send(deletedReview); // return the deleted review without the user data
});

module.exports = router;