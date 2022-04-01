const mongoose = require('mongoose');
const Joi = require('joi');

const reviewSchema = new mongoose.Schema({
    description: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 1024,
        default: null
    },
    rating: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // userId is generated from token
    }
}, { versionKey: false });

const Review = mongoose.model('Review', reviewSchema);

function validate(review) {
    const schema = Joi.object({
        description: Joi.string().min(5).max(1024),
        rating: Joi.number().required(),
        userId: Joi.objectId()
    });

    return schema.validate(review);
}

module.exports.Review = Review;
module.exports.reviewSchema = reviewSchema;
module.exports.validate = validate;