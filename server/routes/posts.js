const { Pin } = require('../models/pin');
const { Post, validate } = require('../models/post');
const upload = require('../middleware/imageHelper');
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

    const post = await new Post({ description: req.body.description, postPictureFileName: req.file.filename }).save();
    pin.posts.push(post);
    await pin.save();

    return res.status(200).send(post);
});

module.exports = router;