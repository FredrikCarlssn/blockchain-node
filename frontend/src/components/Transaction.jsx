export default function Transaction({ transaction }) {
  return (
    <div className=" shadow-md rounded border-2 bg-black my-2">
      <li className="text-white  mb-4">
        <p className="mb-2">From Address: {transaction.fromAddress}</p>
        <p className="mb-2">To Address:{transaction.toAddress}</p>
        <p className="mp-2">Amount: {transaction.amount}</p>
      </li>
    </div>
  );
}
