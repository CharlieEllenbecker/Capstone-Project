console.log(':here');
const express = require('express');
const cors = require('cors');
const error = require('../middleware/error');
const users = require('../routes/users');
const tags = require('../routes/tags');
const pins = require('../routes/pins');
const reviews = require('../routes/reviews');
const posts = require('../routes/posts');

module.exports = function(app) {
    console.log('here');
    app.use(cors({
        origin: "*"
    }));
    app.use(express.json());
    console.log('1');
    app.use(express.static('images'));
    console.log('2');
    app.use('/api/users', users);
    console.log('3');
    app.use('/api/tags', tags);
    console.log('4');
    app.use('/api/pins', pins);
    console.log('5');
    app.use('/api/reviews', reviews);
    console.log('6');
    app.use('/api/posts', posts);
    console.log('7');
    app.use(error);
}