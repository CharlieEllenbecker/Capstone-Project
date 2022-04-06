const { Pin } = require('../models/pin');
const { Post } = require('../models/post');
const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    POST - Post a post to a pin
*/
router.post('/:pinId', auth, async (req, res) => {
    const { error } = validateDescriptionFileExtension(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let pin = await Pin.findById(req.params.pinId);
    if(!pin) {
        return res.status(404).send(`The pin with the given id ${req.params.pinId} does not exist.`);
    }

    let post = await new Post(_.pick(req.body, ['description'])).save();
    console.log(post);
    const postPicture = await new PostPicture({ postId: post._id, fileExtension: req.body.fileExtension }).save();
    post.postPicture = postPicture;
    post = await post.save();

    pin.posts.push(post);
    await pin.save();

    return res.status(200).send(post);
});

module.exports = router;