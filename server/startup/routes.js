const express = require('express');
const cors = require('cors');
const error = require('../middleware/error');
const users = require('../routes/users');
const tags = require('../routes/tags');
const pins = require('../routes/pins');

module.exports = function(app) {
    app.use(cors({
        origin: "*"
    }));
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/tags', tags);
    app.use('/api/pins', pins);
    app.use(error);
}