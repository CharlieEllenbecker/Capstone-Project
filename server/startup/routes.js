const express = require('express');
const cors = require('cors');
const error = require('../middleware/error');
const users = require('../routes/users');
const tags = require('../routes/tags');
const pins = require('../routes/pins');
const reviews = require('../routes/reviews');
const posts = require('../routes/posts');
const pictures = require('../routes/pictures');

module.exports = function(app) {
    app.use(cors({
        origin: "*"
    }));
    app.use(express.json());
    app.use(express.static('images'));
    app.use('/api/users', users);
    app.use('/api/tags', tags);
    app.use('/api/pins', pins);
    app.use('/api/reviews', reviews);
    app.use('/api/posts', posts);
    app.use('/api/pictures', pictures);
    app.use(error);
}