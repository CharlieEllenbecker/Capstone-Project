const mongoose = require('mongoose');
const Joi = require('joi');

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,    // gets added on review creation
        minLength: 5,
        maxLength: 256
    },
    description: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 1024,
        default: ''
    },
    rating: {
        type: Number,
        required: true
    }
}, { versionKey: false });

const Review = mongoose.model('Review', reviewSchema);

function validate(review) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(256),
        description: Joi.string().min(5).max(1024),
        rating: Joi.number().required()
    });

    return schema.validate(review);
}

module.exports.Review = Review;
module.exports.reviewSchema = reviewSchema;
module.exports.validateReview = validate;