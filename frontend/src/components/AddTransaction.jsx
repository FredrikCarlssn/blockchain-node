import { useState } from "react";



export default function TransactionForm(props) {
  const [transactionData, setTransactionData] = useState({
    fromAddress: "",
    toAddress: "",
    amount: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({
      ...transactionData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      transactionData.fromAddress.trim() !== "" &&
      transactionData.toAddress.trim() !== "" &&
      transactionData.amount.trim() !== ""
    ) {
      setErrMsg("");
      await props.createTransaction(JSON.stringify(transactionData));
      setTransactionData({
        fromAddress: "",
        toAddress: "",
        amount: "",
      });
    } else {
      setErrMsg("All fields are required");
    }
  };

  return (
    <>
      <h1>Add a New Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fromAddress">From Address:</label>
          <input
            type="text"
            id="fromAddress"
            name="fromAddress"
            value={transactionData.fromAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="toAddress">To Address:</label>
          <input
            type="text"
            id="toAddress"
            name="toAddress"
            value={transactionData.toAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={transactionData.amount}
            onChange={handleChange}
          />
        </div>
        <button>Add Transaction</button>
        {errMsg && <p>{errMsg}</p>}
      </form>
    </>
  );
}
