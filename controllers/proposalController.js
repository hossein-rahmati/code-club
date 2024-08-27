const Proposal = require('../models/proposalModel');

exports.getAllProposals = async (req, res) => {
  const proposals = await Proposal.find();

  res.status(200).json({
    status: 'success',
    result: proposals.length,
    data: proposals,
  });
};

exports.createProposal = async (req, res, next) => {
  try {
    const proposal = await Proposal.create(req.body);

    res.status(201).json({
      status: 'success',
      data: proposal,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    next();
  }
};
