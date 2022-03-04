const { User, validate, validateEmail} = require('../models/user');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const db = require('../startup/db');
require('express-async-errors');
const router = express.Router();

/*
    Get - Get user info
*/
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(['-_id', '-password']);
    return res.status(200).send(user);
});

/*
    POST - Add a new user
*/
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findOne({ email: req.body.email });
    if(user) {
        return res.status(400).send('User already registered.');
    }

    user = new User(_.pick(req.body, ['email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthToken();

    return res.status(200).header('x-auth-token', token).send(_.pick(user, ['email']));
});

/*
    DELETE - Delete a user
*/
router.delete('/delete', async (req, res) => { 

    const { error } = validateEmail(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    
    if(!user) {
        return res.status(404).send('User doesnt exist');
    }
    await User.findOneAndDelete(user.email);
    return res.status(200).send('User deleted.');

});

/*
    POST - Login user - Logout by not sending the token
*/
router.post('/login', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        return res.status(400).send('Invalid email or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        return res.status(400).send('Invalid email or password.');
    }

    const token = user.generateAuthToken();

    return res.status(200).header('x-auth-token', token).send(_.pick(user, ['email']));
});

/*
    GET - Verify the user is authenticated
*/
router.get('/is-auth', auth, (req, res) => {
    return res.status(200).send();
});

module.exports = router;