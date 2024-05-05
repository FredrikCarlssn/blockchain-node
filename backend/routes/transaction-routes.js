const express = require("express");
const router = express.Router();
const { addTransaction, broadcastTransaction, getTransaction, getPendingTransactions } = require("../controllers/transaction-controller");

// router.route("/:id").get(getTransaction);
router.route("/").post(addTransaction);
router.route("/broadcast").post(broadcastTransaction);
router.route("/pending-transactions").get(getPendingTransactions);

module.exports = router;
