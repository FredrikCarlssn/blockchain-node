const { bloc, blockchain } = require("../utilities/config.js");
const axios = require("axios");

exports.getBlockchain = (req, res) => {
  res.status(200).json(blockchain);
};

exports.mineBlock = async (req, res) => {
  const lastBlock = blockchain.getLastBlock();
  const previousBlockHash = lastBlock["hash"];
  const currentBlockData = {
    transactions: blockchain.pendingTransactions,
    index: lastBlock["index"] + 1,
  };
  const nonce = blockchain.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = blockchain.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );
  const newBlock = blockchain.createNewBlock(
    nonce,
    previousBlockHash,
    blockHash
  );

  blockchain.networkNodes.map(async (networkNodeUrl) => {
    await axios.post(`${networkNodeUrl}/api/v1/block`, { block: newBlock });
  });

  blockchain.emptyPendingTransactions(newBlock);

  res.status(200).json({
    note: "New block mined successfully",
    block: newBlock,
  });
};
