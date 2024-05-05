const { blockchain } = require("../utilities/config.js");
const Keys = require("../models/keyGenerator.js");

exports.createWallet = (req, res) => {
  let { name, publicKey } = req.body;
  let keys;
  if (!publicKey) {
    keys = new Keys();
    publicKey = keys.formatPublicKey();
  }
  const transaction = {
    transactionType: "newAccount",
    details: { publicKey },
  };
  blockchain.addTransactionToPendingTransactions(transaction);
  res.status(201).json({ success: true, data: { publicKey } });
};

exports.createTokenTransaction = (req, res) => {
  const { ammount, toAddress } = req.body;
  const transaction = {
    transactionType: "newTokenTransaction",
    details: { ammount, toAddress },
  };
  blockchain.addTransactionToPendingTransactions(transaction);
  res.status(201).json({ success: true, data: { ammount, toAddress } });
};
