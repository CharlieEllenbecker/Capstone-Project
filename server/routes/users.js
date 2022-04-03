const { User, validate, validateEmailPassword } = require('../models/user');
const { ProfilePicture } = require('../models/profilePicture');
const auth = require('../middleware/auth');
const decodeJwt = require('jwt-decode');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();

/*
    GET - Get user info
*/
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(['-_id', '-password']);
    return res.status(200).send(user);
});

/*
    GET - Verify the user is authenticated
*/
router.get('/is-auth', auth, (req, res) => {
    return res.status(200).send();
});

/*
    POST - Add a new user
*/
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message)
    }

    const userByEmail = await User.findOne({ email: req.body.email });
    if(userByEmail) {
        return res.status(400).send('User already registered with that email.');
    }

    const userByUsername = await User.findOne({ username: req.body.username });
    if(userByUsername) {
        return res.status(400).send('User already registered with that username.');
    }

    let user = new User(_.pick(req.body, ['username', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthToken();

    return res.status(200).header({
        'Access-Control-Expose-Headers': 'x-auth-token',
        'x-auth-token': token
    }).send(_.pick(user, ['username', 'email']));
});

/*
    DELETE - Delete a user
*/
router.delete('/delete', auth, async (req, res) => { 
    const userId = decodeJwt(req.header('x-auth-token'))._id;

    const user = await User.findById(userId);
    if(!user) {
        return res.status(404).send('User does not exist.');
    }
    await User.findByIdAndDelete(userId);

    return res.status(200).send('User deleted.');
});

/*
    POST - Login user - Logout by not sending the token
*/
router.post('/login', async (req, res) => { // TODO: Do we want to allow the user to login with a username instead of an email in the future?
    const { error } = validateEmailPassword(req.body);
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

    return res.status(200).header({
        'Access-Control-Expose-Headers': 'x-auth-token',
        'x-auth-token': token
    }).send(_.pick(user, ['username', 'email']));
});

/*
    POST - Profile Picture
*/
router.post('/profile-picture', auth, async (req, res) => {
    const userId = decodeJwt(req.header('x-auth-token'))._id;

    let user = await User.findById(userId);
    if(!user) {
        return res.status(400).send('User not found.');
    }

    const profilePicture = await new ProfilePicture({ userId: userId }).save();
    user.profilePictureId = profilePicture._id;
    user = await user.save();

    return res.status(200).send(user);
});

module.exports = router;