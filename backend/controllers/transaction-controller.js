const { blockchain } = require("../utilities/config.js");

exports.addTransaction = (req, res) => {
  const transaction = req.body;
  let success;
  if (req.body.amount && req.body.sender && req.body.recipient) {
    success = blockchain.createTokenTransaction(transaction);
  } else {
    success = blockchain.addTransactionToPendingTransactions(transaction);
  }
  if (!success)
    res.status(400).json({
      success: false,
      errorMessage: "Transaction validation failed",
    });
  res.status(200).json({ success: true, data: index });
};

exports.broadcastTransaction = (req, res) => {
  let transaction = req.body;
  transaction.transactionId = createId();

  blockchain.addTransactionToPendingTransactions(transaction);

  blockchain.networkNodes.forEach(async (networkNodeUrl) => {
    await axios.post(`${networkNodeUrl}/api/v1/transaction`, transaction);
  });

  res.status(200).json({ success: true, data: transaction });
};

exports.getTransaction = (req, res) => {
  const transactionId = req.params.transactionId;
  const { block, transaction } = blockchain.findTransaction(transactionId);
  if (transaction && block)
    res.status(200).json({ success: true, data: { block, transaction } });
  else
    res
      .status(404)
      .json({ success: false, errorMessage: "Transaction not found" });
};

exports.getPendingTransactions = (req, res) => {
  res.status(200).json(blockchain.pendingTransactions);
};
