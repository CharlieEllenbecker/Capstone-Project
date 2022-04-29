const mongoose = require('mongoose');
const Joi = require('joi');

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 1024,
        default: null
    },
    postPictureFileName: {
        type: String,
        required: true
    },
    pinId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pin',
        required: true  // A post can not exist without a pin
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // userId is generated from token
    }
}, { versionKey: false });

const Post = mongoose.model('Post', postSchema);

function validate(post) {
    const schema = Joi.object({
        description: Joi.string().min(5).max(1024),
        postPictureFileName: Joi.string().required(),
        pinId: Joi.objectId(),
        userId: Joi.objectId()
    });

    return schema.validate(post);
}

function validateForUpdate(post) {
    const schema = Joi.object({
        description: Joi.string().min(5).max(1024)
    });

    return schema.validate(post);
}

module.exports.Post = Post;
module.exports.postSchema = postSchema;
module.exports.validate = validate;
module.exports.validateForUpdate = validateForUpdate;