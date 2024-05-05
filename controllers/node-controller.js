const { blockchain } = require("../utilities/config.js");
const axios = require("axios");

exports.broadcastNode = async (req, res) => {
  const url = req.body.nodeUrl;

  if (!blockchain.networkNodes.includes(url)) {
    blockchain.networkNodes.push(url);
  }

  blockchain.networkNodes.map(async (networkNodeUrl) => {
    await axios.post(`${networkNodeUrl}/api/v1/node/register-node`, {
      nodeUrl: url,
    });
  });

  const allNodes = { nodes: [...blockchain.networkNodes, blockchain.nodeUrl] };

  await axios.post(`${url}/api/v1/node/register-nodes`, allNodes);

  res.status(201).json({ success: true, data: url });
};

exports.addNode = (req, res) => {
  const url = req.body.nodeUrl;

  if (!blockchain.networkNodes.includes(url) && url !== blockchain.nodeUrl) {
    blockchain.networkNodes.push(url);
  }
  res.status(201).json({ success: true, data: url });
};

exports.addNodes = (req, res) => {
  const nodes = req.body.nodes;
  nodes.map((node) => {
    if (!blockchain.networkNodes.includes(node) && node !== blockchain.nodeUrl)
      blockchain.networkNodes.push(node);
  });

  res.status(200).json({
    note: "New nodes have been added",
    nodes: nodes,
  });
};
