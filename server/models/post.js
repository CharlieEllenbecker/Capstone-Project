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
    postPictureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostPicture',
        required: false // added after creating the post
    }
});

const Post = new mongoose.model('Post', postSchema);

function validate(post) {
    const schema = Joi.object({
        description: Joi.string().min(5).max(1024),
        postPictureId: Joi.objectId()
    });

    return schema.validate(post);
}

module.exports.Post = Post;
module.exports.postSchema = postSchema;
module.exports.validate = validate;