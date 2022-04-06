const mongoose = require('mongoose');
const Joi = require('joi');

const profilePictureSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    fileExtension: {
        type: String,
        required: true
    }
}, { versionKey: false });

const ProfilePicture = mongoose.model('ProfilePicture', profilePictureSchema);

function validate(profilePicture) {
    const schema = Joi.object({
        userId: Joi.objectId(),
        fileExtension: Joi.string().required()
    });

    return schema.validate(profilePicture);
}

module.exports.profilePictureSchema = profilePictureSchema;
module.exports.ProfilePicture = ProfilePicture;
module.exports.validate = validate;