const express = require('express');
const app = express();

require('./startup/logging')(); // call first to log first
require('./startup/db')();

app.use(express.json());

const port = 3001;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});