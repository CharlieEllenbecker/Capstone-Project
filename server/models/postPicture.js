const mongoose = require('mongoose');
const Joi = require('joi');

const postPictureSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: false
    }
}, { versionKey: false });

const PostPicture = mongoose.model('PostPicture', postPictureSchema);

function validate(postPicture) {
    const schema = Joi.object({
        postId: Joi.object()
    });

    return schema.validate(postPicture);
}

module.exports.PostPicture = PostPicture;
module.exports.validate = validate;