const express = require("express");
const router = express.Router();
const {
  createWallet,
  createTokenTransaction,
} = require("../controllers/ledger-controller.js");

router.route("/create-wallet").post(createWallet);

module.exports = router;
