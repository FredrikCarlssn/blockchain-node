const { blockchain } = require("../utilities/config.js");

exports.createWallet = (req, res) => {
  const address = blockchain.createWallet();

  res.status(201).json({ success: true, data: { address } });
};

exports.createTokenTransaction = (req, res) => {
  const { ammount, fromAddress, toAddress } = req.body;
  const transaction = {
    transactionType: "newTokenTransaction",
    details: { ammount, fromAddress, toAddress },
  };
  blockchain.addTransactionToPendingTransactions(transaction);
  res.status(201).json({ success: true, data: { ammount, toAddress } });
};
