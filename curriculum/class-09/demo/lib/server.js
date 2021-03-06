'use strict';

/** @module lib/server */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Custom Middleware
const errorHandler = require('../middleware/500.js');
const notFoundHandler = require('../middleware/404.js');

require('../docs/config/swagger');

// Custom Routes
const apiRouter = require('../routes/v1.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static('./public'));

// Actual Routes
app.use(apiRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);


/**
 * Export object with app and start method attached
 * @type {Object}
 */
module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

