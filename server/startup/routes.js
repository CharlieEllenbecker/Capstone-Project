const express = require('express');
const cors = require('cors');
const error = require('../middleware/error');
const users = require('../routes/users');

module.exports = function(app) {
    app.use(cors({
        origin: "*"
    }));
    app.use(express.json());
    app.use('/api/users', users);
    app.use(error);
}