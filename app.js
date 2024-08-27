const express = require('express');
const morgan = require('morgan');

const proposalRouter = require('./routes/proposalRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// middlewares
// parsing body of requests
app.use(express.json());
// log requests
app.use(morgan('dev'));

// Routes
app.use('/api/v1/proposal', proposalRouter);
app.use('/login', userRouter);

app.use(globalErrorHandler);

module.exports = app;
