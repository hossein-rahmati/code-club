/* eslint-disable no-undef */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connected successfully'));

const port = process.env.PORT;
app.listen(port, () => console.log(`App is listening on port ${port}`));
