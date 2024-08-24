const { Schema, model } = require('mongoose');
const validator = require('validator');

const proposalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'this email has used before'],
    isLowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  profession: {
    type: String,
    trim: true,
    required: [true, 'profession is required'],
  },
});

const Proposal = model('Proposal', proposalSchema);
module.exports = Proposal;
