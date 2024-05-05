const { blockchain } = require("../utilities/config.js");
const axios = require("axios");

exports.synchronize = (req, res) => {
  const currentChainLength = blockchain.chain.length;
  let maxLength = currentChainLength;
  let longestChain = blockchain.chain;
  let pendingList = blockchain.pendingTransactions;
  blockchain.networkNodes.map(async (networkNodeUrl) => {
    axios.get(`${networkNodeUrl}/api/v1/blockchain`).then((response) => {
      if (
        response.data.chain.length > maxLength &&
        blockchain.chainIsValid(response.data.data.chain)
      ) {
        maxLength = response.data.chain.length;
        longestChain = response.data.chain;
        pendingList = response.data.pendingTransactions;
      }
    });
  });
  blockchain.chain = longestChain;
  blockchain.pendingTransactions = pendingList;
  res.status(200).json({ success: true, data: longestChain });
};
