const mongoose = require('mongoose');
const Joi = require('joi');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
        userId: Joi.objectId(),
        description: Joi.string().min(5).max(1024).allow(''),
        rating: Joi.number().required()
    });

    return schema.validate(review);
}

module.exports.Review = Review;
module.exports.reviewSchema = reviewSchema;
module.exports.validateReview = validate;