const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')(); // call first to log first
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = 3001;
module.exports = app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
    winston.info(`Listening to port ${port}...`);
});