const Keys = require("./keyGenerator.js");

class Wallet {
  constructor() {
    this.address = new Keys().formatPublicKey();
    this.balance = 0;
  }

  getBalance() {
    return this.balance;
  }
}

module.exports = Wallet;
