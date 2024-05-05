const express = require("express");
const router = express.Router();
const {
  createAccount,
  createTransaction,
} = require("../controllers/ledger-controller.js");

router.route("/create-person").post(createAccount);
router.route("/create-transaction").post(createTransaction);

module.exports = router;
