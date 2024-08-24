const express = require('express');
const morgan = require('morgan');

const proposalRouter = require('./routes/proposalRoutes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/proposal', proposalRouter);

module.exports = app;
