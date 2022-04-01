const { coordinateSchema } = require('./coordinate');
const { reviewSchema } = require('./review');
const { tagSchema } = require('./tag');
const mongoose = require('mongoose');
const Joi = require('joi');

const pinSchema = new mongoose.Schema({
    coordinate: coordinateSchema,
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 256
    },
    description: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 1024,
        default: null
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    },
    tags: [tagSchema],
    reviews: [reviewSchema],  // TODO: implement image reference? name of image stored in another local bucket or something?
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // userId is generated from token
    }
}, { versionKey: false });

const Pin = mongoose.model('Pin', pinSchema);

function validate(pin) {
    const schema = Joi.object({
        coordinate: Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required()
        }),
        title: Joi.string().min(5).max(256).required(),
        description: Joi.string().min(5).max(1024),
        rating: Joi.number(),
        tags: Joi.array().items(Joi.object({
            name: Joi.string().min(3).max(64).required()
        })),
        reviews: Joi.array().items(Joi.object({
            pinId: Joi.objectId(),
            userId: Joi.objectId(),
            description: Joi.string().min(5).max(1024),
            rating: Joi.number().required()
        })),
        userId: Joi.objectId()
    });

    return schema.validate(pin);
}

module.exports.Pin = Pin;
module.exports.validate = validate;