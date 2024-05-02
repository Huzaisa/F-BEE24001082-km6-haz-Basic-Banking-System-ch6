require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(express.json());

const routes = require('./routes/routes');
app.use('/v1/api', routes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: false,
        message: 'Internal Server Error',
        data: null
    });
});


app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: `Endpoint not found: ${req.method} ${req.url}`,
        data: null
    });
});

module.exports = app;