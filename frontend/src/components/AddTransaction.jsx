import { useState, setTimeout } from "react";
import { createTransaction } from "../services/blockchainAPI";

export default function TransactionForm() {
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
      const success = await createTransaction(transactionData);
      if (!success) {setErrMsg("Transaction not valid")} else {
        setErrMsg("Transaction sent");
        setTimeout(() => {
          setErrMsg("");
        }, [3000])
      }
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
      <h1 className="font-bold">Add a New Transaction</h1>
      <form onSubmit={handleSubmit}>
 
      <div className="flex justify-center items-center ">
          <label className="font-bold text-md w-32 mx-4 italic flex justify-end" htmlFor="fromAddress">From Address:</label>
          <input
          className="w-9/12 h-8 mt-2 placeholder: pl-2"
            type="text"
            id="fromAddress"
            placeholder="Enter address"
            name="fromAddress"
            value={transactionData.fromAddress}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center items-center">
          <label className="font-bold text-md w-32 mx-4 italic flex justify-end" htmlFor="toAddress">To Address:</label>
          <input
       className="w-9/12 h-8 mt-2 placeholder: pl-2"
            type="text"
            id="toAddress"
            name="toAddress"
            placeholder="Enter address"
            value={transactionData.toAddress}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <label className="font-bold text-md italic flex justify-end mt-4 text-xl" htmlFor="amount">Amount</label>
          <input
      className="w-4/12 h-8 mt-2  placeholder: pl-2"
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            value={transactionData.amount}
            onChange={handleChange}
          />
        </div>

        <button className="mt-6 w-46 h-12">Add Transaction</button>
        {errMsg && <p>{errMsg}</p>}
      </form>
    </>
  );
}
