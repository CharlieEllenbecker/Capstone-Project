const mongoose = require('mongoose');
const Joi = require('joi');

const coordinateSchema = new mongoose.Schema({
    
}, { versionKey: false });

module.exports.coordinateSchema = coordinateSchema;

//     coordinate: {
//       latitude: 43.03725,
//       longitude: -87.91891,
//     },