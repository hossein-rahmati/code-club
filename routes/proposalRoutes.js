const express = require('express');
const {
  getAllProposals,
  createProposal,
} = require('../controllers/proposalController');

const router = express.Router();

router.route('/').get(getAllProposals).post(createProposal);

module.exports = router;
