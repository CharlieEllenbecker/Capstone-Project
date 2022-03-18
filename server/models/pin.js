const { coordinateSchema } = require('./coordinate');
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
        default: ''
    },
    tags: [tagSchema],
    reviews: {
        type: Number,
        required: false,
        default: 0
    }   // TODO: implement image reference? name of image stored in another local bucket or something?
}, { versionKey: false });

const Pin = mongoose.model('Pin', pinSchema);

function validate(pin) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(256).required(),
        description: Joi.string().min(5).max(1024).optional().allow(''),
        tags: Joi.array().items(Joi.object({
            name: Joi.string().min(3).max(64).required()
        })).required(),
        reviews: Joi.number().optional()
    });

    return schema.validate(pin);
}

module.exports.Pin = Pin;
module.exports.validate = validate;