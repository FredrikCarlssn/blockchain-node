const { blockchain } = require("../utilities/config.js");

exports.createWallet = (req, res) => {
  const address = blockchain.createWallet();

  res.status(201).json({ success: true, data: { address } });
};

exports.createTokenTransaction = (req, res) => {
  const { amount, fromAddress, toAddress } = req.body;
  const transaction = {
    amount,
    fromAddress,
    toAddress,
  };
  const validationSuccess = blockchain.createTokenTransaction(transaction);
  if (!validationSuccess) return res.status(400).json({ success: false });
  return res.status(201).json({ success: true });
};
