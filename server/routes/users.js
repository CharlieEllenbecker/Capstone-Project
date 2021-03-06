const { User, validate, validateEmailPassword, validateForUpdate } = require('../models/user');
const auth = require('../middleware/auth');
var fs = require('fs');
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
    GET - Get the user with the given userId
*/
router.get('/:userId', auth, async (req, res) => {
    const user = await User.findById(req.params.userId).select(['-_id', '-password']);

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

    const userByEmail = await User.findOne({ email: req.body.email });
    if(userByEmail) {
        return res.status(400).send('User already registered with that email.');
    }

    const userByUsername = await User.findOne({ username: req.body.username });
    if(userByUsername) {
        return res.status(400).send('User already registered with that username.');
    }

    let user = await new User(_.pick(req.body, ['username', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthToken();

    return res.status(200).header({
        'Access-Control-Expose-Headers': 'x-auth-token',
        'x-auth-token': token
    }).send(_.pick(user, ['username', 'email', 'profilePictureFileName']));
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
    }).send(_.pick(user, ['username', 'email', 'profilePictureFileName']));
});

/*
    POST - Upload Profile Picture
    req.body = {
        base64: base64 encoded image,
        fileName: name of the base64 encoded image,
        isTest: boolean (only true for tests!)
    }
*/
router.post('/profile-picture', auth, async (req, res) => {
    const userId = decodeJwt(req.header('x-auth-token'))._id;

    let user = await User.findById(userId);
    if(!user) {
        return res.status(400).send('User not found.');
    }

    const buff = Buffer.from(req.body.base64, 'base64');
    const profilePictureFileName = `${Date.now()}-${req.body.fileName}`;
    const directoryPath = (req.body.isTest) ? './tests/testUploadedImages/' : './images/';

    fs.writeFile(`${directoryPath}${profilePictureFileName}`, buff, function(err) {
        if(err) {
            console.log('Users upload profile picture route writeFile Error:', err);
        }
    });

    user.profilePictureFileName = profilePictureFileName;
    user = await user.save();

    return res.status(200).send(_.pick(user, ['username', 'email', 'profilePictureFileName']));
});

/*
    PUT - Update Profile Picture
    req.body = {
        base64: base64 encoded image,
        fileName: name of the base64 encoded image,
        isTest: boolean (only true for tests!)
    }
*/
router.put('/profile-picture', auth, async (req, res) => {
    const userId = decodeJwt(req.header('x-auth-token'))._id;

    let user = await User.findById(userId);
    if(!user) {
        return res.status(400).send('User not found.');
    }

    if(user.profilePictureFileName !== null) {
        fs.unlinkSync(`./images/${user.profilePictureFileName}`);
    }

    const buff = Buffer.from(req.body.base64, 'base64');
    const profilePictureFileName = `${Date.now()}-${req.body.fileName}`;
    const directoryPath = (req.body.isTest) ? './tests/testUploadedImages/' : './images/';

    fs.writeFile(`${directoryPath}${profilePictureFileName}`, buff, function(err) {
        if(err) {
            console.log('Users update profile picture route writeFile Error:', err);
        }
    });

    user.profilePictureFileName = profilePictureFileName;
    user = await user.save();

    return res.status(200).send(_.pick(user, ['username', 'email', 'profilePictureFileName']));
});

/*
    PUT - Update username, password, and or email
*/
router.put('/', auth, async (req, res) => {
    const { error } = validateForUpdate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const userId = decodeJwt(req.header('x-auth-token'))._id;
    const user = await User.findByIdAndUpdate(userId, _.pick(req.body, ['username', 'email', 'password']), { new: true });
    if(!user) {
        return res.status(400).send('User not found.');
    }

    return res.status(200).send(_.pick(user, ['username', 'email', 'profilePictureFileName']));
});

/*
    DELETE - Delete a user
*/
router.delete('/delete', auth, async (req, res) => { 
    const userId = decodeJwt(req.header('x-auth-token'))._id;
    const user = await User.findByIdAndDelete(userId);
    if(!user) {
        return res.status(404).send('User does not exist.');
    }

    return res.status(200).send(_.pick(user, ['username', 'email', 'profilePictureFileName']));
});

module.exports = router;