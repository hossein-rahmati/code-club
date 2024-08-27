const express = require('express');
const {
  getAllProposals,
  createProposal,
} = require('../controllers/proposalController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.route('/').get(protect, getAllProposals).post(createProposal);

module.exports = router;
