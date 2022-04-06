const { User, validate, validateEmailPassword } = require('../models/user');
const { ProfilePicture } = require('../models/profilePicture');
const auth = require('../middleware/auth');
const decodeJwt = require('jwt-decode');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
require('express-async-errors');
const router = express.Router();
const multer = require('multer');   // TODO

/*
    GET - Get user info
*/
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(['-_id', '-password']);   // TODO                             ***********
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

const storage = multer.diskStorage({
    destination: 'images',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

/*
    POST - Profile Picture (test)
*/
router.post('/test', upload.single('image'), async (req, res) => {
    console.log(`File Name: ${req.file.filename}`); // this is the new file name
    return res.status(200).send('Image Uploaded.');
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

    req.body.userId = userId;
    const profilePicture = await new ProfilePicture(_.pick(req.body, ['userId', 'fileExtension'])).save();  // file extension should be found on the front-end first
    user.profilePicture = profilePicture;
    user = await user.save();

    return res.status(200).send(user);
});

/*
    PUT - Update profile picture
*/
router.put('/profile-picture', auth, async (req, res) => {
    // TODO
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

module.exports = router;