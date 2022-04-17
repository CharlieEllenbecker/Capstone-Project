const { Pin } = require('../models/pin');
const { Review, validate } = require('../models/review');
const auth = require('../middleware/auth');
const decodeJwt = require('jwt-decode');
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

    const reviews = find({ pinId: req.params.pinId });

    return res.status(200).send(reviews);
});

/*
    POST - Add review to a pin
*/
router.post('/:pinId', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    if(pin.reviews.some(r => r.userId.toString() === userId)) {
        return res.status(400).send(`The pin with the given id ${req.params.pinId} already contains a review from that user.`);
    }

    req.body.userId = userId;
    req.body.pinId = req.params.pinId;
    const review = await new Review(_.pick(req.body, ['description', 'rating', 'pinId', 'userId']));

    const reviews = await Review.find({ pinId: review.pinId });
    const ratingSum = 0;
    reviews.forEach(r => {
        ratingSum += r.rating;
    });

    pin.rating = reviews.length !== 0 ? (ratingSum / review.length) : 0;    // update the pin rating

    return res.status(200).send(review);
});

/*
    PUT - Update a review on a pin
*/
router.put('/:reviewId', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const review = await Review.findByIdAndUpdate(req.params.reviewId, _.pick(req.body, ['description', 'rating']));
    if(!review) {
        return res.status(404).send(`The review with the given id ${req.params.reviewId} does not exist.`);
    }

    const reviews = await Review.find({ pinId: review.pinId });
    const ratingSum = 0;
    reviews.forEach(r => {
        ratingSum += r.rating;
    });

    let pin = await Pin.findById(review.pinId);
    pin.rating = reviews.length !== 0 ? (ratingSum / reviews.length) : 0;   // update the pin rating
    await pin.save();

    return res.status(200).send(review);
});

/*
    DELETE - Delete a review from a pin
*/
router.delete('/:reviewId', auth, async (req, res) => {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if(!review) {
        return res.status(404).send(`The review with the given id ${req.params.reviewId} does not exist.`);
    }

    const reviews = await Review.find({ pinId: review.pinId });
    const ratingSum = 0;
    reviews.forEach(r => {
        ratingSum += r.rating;
    });

    let pin = await Pin.findById(review.pinId);
    pin.rating = reviews.length !== 0 ? (ratingSum / review.length) : 0;     // update the pin rating

    return res.status(200).send(review);
});

module.exports = router;