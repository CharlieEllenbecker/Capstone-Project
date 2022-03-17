const mongoose = require('mongoose');
const Joi = require('joi');

const coordinateSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
}, { versionKey: false });

const Coordinate = mongoose.model('Coordinate', coordinateSchema);

function validate(coordinate) {
    const schema = Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
    });

    return schema.validate(coordinate);
}

module.exports.Coordinate = Coordinate;
module.exports.coordinateSchema = coordinateSchema;
module.exports.validate = validate;