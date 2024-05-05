
export default function Transaction({transaction}) {

  console.log("transaction", transaction
)
        
      return (
        <div className="border rounded-xl">
          <li className="text-white p-2">
            <p className="mb-2">
            <b>From Address:</b>  {transaction.data.fromAddress}
            </p>
            <p className="mb-2">
            <b> To Address:</b>{transaction.data.toAddress}
            </p>
            <p className="mp-2">
             Amount: {transaction.data.amount}
            </p>
          </li>
        </div>
      );
    
  }