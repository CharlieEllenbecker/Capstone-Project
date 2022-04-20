const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 256
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 256
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    profilePictureFileName: {
        type: String,
        required: false,
        default: null
    }
}, { versionKey: false });

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));    // TODO: expiresIn property?
}

const User = mongoose.model('User', userSchema);

function validate(user) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(256).required(),
        email: Joi.string().min(5).max(256).email().required(),
        password: Joi.string().min(5).max(1024).required(), // TODO: utilize joi-password-conplexity module?
        profilePictureFileName: Joi.string()
    });

    return schema.validate(user);
}

function validateForUpdate(user) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(256),
        email: Joi.string().min(5).max(256).email(),
        password: Joi.string().min(5).max(1024)
    });

    return schema.validate(user);
}

function validateEmailPassword(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(256).email().required(),
        password: Joi.string().min(5).max(1024).required()
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validate;
module.exports.validateEmailPassword = validateEmailPassword;
module.exports.validateForUpdate = validateForUpdate;