const express = require("express");
const router = express.Router();
const {
  createWallet,
  createTokenTransaction,
} = require("../controllers/ledger-controller.js");

router.route("/create-wallet").post(createWallet);
router.route("/create-token-transaction").post(createTokenTransaction);

module.exports = router;
