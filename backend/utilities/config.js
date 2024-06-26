const Blockchain = require("../models/blockchain");
const { v4: uuidv4 } = require("uuid");

let blockchain = new Blockchain();
const createId = () => {
  return uuidv4().split("-").join("");
};
const nodeAddress = uuidv4().split("-").join("");

module.exports = { blockchain, nodeAddress, createId };
