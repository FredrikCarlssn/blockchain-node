const { blockchain } = require("../utilities/config.js");

exports.createWallet = (req, res) => {
  const address = blockchain.createWallet();

  res.status(201).json({ success: true, data: { address } });
};
