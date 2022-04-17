const { Pin } = require('../models/pin');
const { Post, validate } = require('../models/post');
const { upload } = require('../middleware/imageHelper');
const auth = require('../middleware/auth');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    POST - Post a post to a pin
*/
router.post('/:pinId', [auth, upload.single('image')], async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    const post = await new Post({
        description: req.body.description,
        postPictureFileName: req.file.filename,
        pinId: req.params.pinId,
        useId: userId
    }).save();

    return res.status(200).send(post);
});

/*
    PUT - Update the description
*/
router.put('/:postId', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let post = await Post.findById(req.params.postId);
    if(!post) {
        return res.status(404).send(`The post with the given id ${req.params.postId} does not exist.`);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    if(post.userId.toString() !== userId) {
        return res.status(404).send(`The post can not be edited by this user.`);
    }

    post = await post.findByIdAndUpdate(req.params.postId, _.pick(req.body, ['description']), { new: true });

    return res.status(200).send(post);
});

module.exports = router;