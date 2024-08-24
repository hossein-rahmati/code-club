const Proposal = require('../models/proposalModel');

exports.getAllProposals = async (req, res, next) => {
  const proposals = await Proposal.find();

  res.status(200).json({
    status: 'success',
    data: proposals,
  });
};

exports.createProposal = async (req, res, next) => {
  console.log(req.body);

  const proposal = await Proposal.create(req.body);

  res.status(201).json({
    status: 'success',
    data: proposal,
  });
};
