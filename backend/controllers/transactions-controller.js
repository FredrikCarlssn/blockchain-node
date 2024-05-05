const { blockchain } = require("../utilities/config.js");

exports.listTransactions = (req, res) => {
  const address = req.params.address;
  const transactions = blockchain.listTransactions(address);
  res.status(200).json({ success: true, data: transactions });
};
