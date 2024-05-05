const express = require("express");
const router = express.Router();

const {
  broadcastNode,
  addNode,
  addNodes,
} = require("../controllers/node-controller");

router.route("/").post(broadcastNode);
router.route("/register-node").post(addNode);
router.route("/register-nodes").post(addNodes);

module.exports = router;
