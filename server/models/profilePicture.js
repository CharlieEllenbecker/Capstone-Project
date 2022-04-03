const mongoose = require('mongoose');
const Joi = require('joi');

const profilePictureSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // userId is generated from token
    }
}, { versionKey: false });

const ProfilePicture = mongoose.model('ProfilePicture', profilePictureSchema);

function validate(profilePicture) {
    const schema = Joi.object({
        userId: Joi.object()
    });

    return schema.validate(profilePicture);
}

module.exports.ProfilePicture = ProfilePicture;
module.exports.validate = validate;