const { coordinateSchema } = require('./coordinate');
const mongoose = require('mongoose');
const Joi = require('joi');

const pinSchema = new mongoose.Schema({
    coordinate
}, { versionKey: false });



// {
//     coordinate: {
//       latitude: 43.03725,
//       longitude: -87.91891,
//     },
//     title: 'Amazing Food Place',
//     description: 'This is the best food place',
//     image: Images[0].image,
//     rating: 4,
//     reviews: 99,
// }