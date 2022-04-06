const { postPictureSchema } = require('../models/postPicture');
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
    postPicture: postPictureSchema
}, { versionKey: false });

const Post = new mongoose.model('Post', postSchema);

function validate(post) {
    const schema = Joi.object({
        description: Joi.string().min(5).max(1024),
        postPicture: Joi.object({
            postId: Joi.objectId(),
            fileExtension: Joi.string().required()
        })
    });

    return schema.validate(post);
}

function validateDescriptionFileExtension(body) {
    const schema = Joi.object({
        description: Joi.string().min(5).max(1024),
        fileExtension: Joi.string().required()
    });

    return schema.validate(body);
}

module.exports.Post = Post;
module.exports.postSchema = postSchema;
module.exports.validate = validate;
module.exports.validateDescriptionFileExtension = validateDescriptionFileExtension;