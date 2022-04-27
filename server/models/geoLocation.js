const mongoose = require('mongoose');
const Joi = require('joi');

const geoLocationSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: false,
        defaule: 'Point'
    },
    coordinates: {  // [lat, long]
        type: [Number],
        required: true
    }
});