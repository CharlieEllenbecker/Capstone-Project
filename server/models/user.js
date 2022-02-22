const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 256,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}, { versionKey: false });

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));    // TODO: expiresIn property?
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(256).email().required(),
        password: Joi.string().min(5).max(1024).required()  // TODO: utilize joi-password-conplexity module?
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;