const mongoose = require('mongoose');
const Joi = require('joi');

const locationSchema = mongoose.Schema({
    type: {
        type: String,
        required: false,
        defaule: 'Point'
    },
    coordinates: {  // [lat, lon]
        type: [Number],
        required: true
    }
});

const Location = mongoose.model('Location', locationSchema);

function validate(location) {
    const schema = Joi.object({
        type: Joi.string(),
        coordinates: Joi.array().items(Joi.number()).required()
    });

    return schema.validate(location);
}

module.exports.Location = Location;
module.exports.locationSchema = locationSchema;
module.exports.validate = validate;