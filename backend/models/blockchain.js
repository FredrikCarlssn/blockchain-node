const sha256 = require("sha256");
const Wallet = require("./wallet");

class Blockchain {
  constructor() {
    const wallet = new Wallet();
    wallet.balance = 21000000;
    this.chain = [
      {
        index: 1,
        timestamp: 1693584518776,
        transactions: [],
        nonce: 1,
        hash: "Genesis",
        previousBlockHash: "Genesis",
      },
    ];
    this.pendingTransactions = [];
    this.ledger = { wallets: [wallet] };
    this.nodeUrl = process.argv[3];
    this.networkNodes = [];
  }

  createNewBlock(nonce, previousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce: nonce,
      hash: hash,
      previousBlockHash: previousBlockHash,
    };
    this.chain.push(newBlock);
    return newBlock;
  }

  emptyPendingTransactions(newBlock) {
    newBlock.transactions.map((transaction) => {
      switch (transaction.transactionType) {
        case "token":
          this.tokenTransaction(transaction);
          break;
        default:
          break;
      }
    });
    this.pendingTransactions = [];
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransactionToPendingTransactions(transaction) {
    this.pendingTransactions.push(transaction);
    return this.getLastBlock()["index"] + 1;
  }

  hashBlock(previousBlockHash, currentBlockData, nonce) {
    const dataAsString =
      previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
  }

  proofOfWork(previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== "0000") {
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    return nonce;
  }

  chainIsValid(blockchain) {
    const isValid = blockchain.every((block, index) => {
      if (index === 0) {
        if (
          block.hash !== "Genesis" ||
          block.previousBlockHash !== "Genesis" ||
          block.data
        ) {
          return false;
        } else {
          return true;
        }
      }

      const { previousBlockHash, hash, nonce, transactions } = block;
      const currentBlockData = {
        transactions: transactions,
        index: index + 1,
      };

      const generatedHash = this.hashBlock(
        previousBlockHash,
        currentBlockData,
        nonce
      );
      const previousBlock = blockchain[index - 1];

      if (hash !== generatedHash || previousBlockHash !== previousBlock.hash) {
        return false;
      } else {
        return true;
      }
    });
    return isValid;
  }

  findBlock(blockHash) {
    return this.chain.find((block) => block.hash === blockHash);
  }

  findTransaction(transactionId) {
    let correctBlock = null;
    let correctTransaction = null;

    this.chain.find((block) => {
      block.transactions.find((transaction) => {
        if (transaction.transactionId === transactionId) {
          correctBlock = block;
          correctTransaction = transaction;
        }
      });
    });
    return { block: correctBlock, transaction: correctTransaction };
  }

  addTransactionToPendingTransactions(transaction) {
    this.pendingTransactions.push(transaction);
    return this.getLastBlock()["index"] + 1;
  }

  getLedger() {
    return this.ledger;
  }

  createWallet() {
    const wallet = new Wallet();
    this.ledger.wallets.push(wallet);
    return wallet.address;
  }

  tokenTransaction(transaction) {
    const senderWallet = this.ledger.wallets.find(
      (wallet) => wallet.address === transaction.fromAddress
    );
    const recipientWallet = this.ledger.wallets.find(
      (wallet) => wallet.address === transaction.toAddress
    );

    if (!this.validateTokenTransaction(transaction)) return;

    // Deduct the amount from the sender's wallet
    senderWallet.balance -= transaction.amount;

    // Add the amount to the recipient's wallet
    if (recipientWallet) {
      recipientWallet.balance += transaction.amount;
    } else {
      // If the recipient's wallet doesn't exist, create it
      const newWallet = new Wallet();
      newWallet.address = transaction.toAddress;
      newWallet.balance = transaction.amount;
      this.ledger.wallets.push(newWallet);
    }
  }

  validateTokenTransaction(transaction) {
    const senderWallet = this.ledger.wallets.find(
      (wallet) => wallet.address === transaction.fromAddress
    );

    if (
      !!recipientWallet ||
      !senderWallet ||
      senderWallet.getBalance() < transaction.amount
    ) {
      return false;
    }

    return true;
  }

  createTokenTransaction(transaction) {
    if (!this.validateTokenTransaction(transaction)) return;
    const newTransactionIndex =
      this.addTransactionToPendingTransactions(transaction);

    return newTransactionIndex;
  }
}

module.exports = Blockchain;
