const { Pin } = require('../models/pin');
const { Post, validate, validateForUpdate } = require('../models/post');
const auth = require('../middleware/auth');
const decodeJwt = require('jwt-decode');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    GET - Get all user specific posts
*/
router.get('/my', auth, async (req, res) => {
    const userId = decodeJwt(req.header('x-auth-token'))._id;
    const posts = await Post.find({ userId: userId });

    return res.status(200).send(posts);
});

/*
    GET - Get a post for a given postId
*/
router.get('/:postId', auth, async (req, res) => {
    const post = await Post.findById(req.params.postId);
    if(!post) {
        return res.status(404).send(`The post with the given id ${req.params.postId} does not exist.`);
    }

    return res.status(200).send(post);
});

/*
    GET - Get all posts for a given pinId
*/
router.get('/all/:pinId', auth, async (req, res) => {
    const pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    const posts = await Post.find({ pinId: req.params.pinId });

    return res.status(200).send(posts);
});

/*
    POST - Post a post to a pin (image is posted seperately)
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

    req.body.userId = decodeJwt(req.header('x-auth-token'))._id;
    req.body.pinId = req.params.pinId;
    const post = await new Post(_.pick(req.body, ['description', 'postPictureFileName', 'pinId', 'userId'])).save();

    return res.status(200).send(post);
});

/*
    PUT - Update the description
*/
router.put('/:postId', auth, async (req, res) => {
    const { error } = validateForUpdate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let post = await Post.findById(req.params.postId);
    if(!post) {
        return res.status(404).send(`The post with the given id ${req.params.postId} does not exist.`);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    if(post.userId.toString() !== userId) {
        return res.status(404).send(`The post with the given id ${req.params.postId} can not be edited by this user.`);
    }

    post.description = req.body.description;
    post = await post.save();

    return res.status(200).send(post);
});

/*
    DELETE - Delete the post with the given postId
*/
router.delete('/:postId', auth, async (req, res) => {
    let post = await Post.findById(req.params.postId);
    if(!post) {
        return res.status(404).send(`The post with the given id ${req.params.postId} does not exist.`);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    if(post.userId.toString() !== userId) {
        return res.status(404).send(`The post with the given id ${req.params.postId} can not be deleted by this user.`);
    }

    post = await Post.findByIdAndDelete(req.params.postId);

    return res.status(200).send(post);
});

module.exports = router;