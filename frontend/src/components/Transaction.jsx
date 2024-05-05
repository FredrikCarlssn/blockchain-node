
export default function Transaction({transaction}) {

  console.log("transaction", transaction
)
        
      return (
        <div className=" shadow-md rounded border   my-2">
          <li className="text-white  mb-4">
            <p className="mb-2">
            From Address:  {transaction.data.fromAddress}
            </p>
            <p className="mb-2">
             To Address:{transaction.data.toAddress}
            </p>
            <p className="mp-2">
             Amount: {transaction.data.amount}
            </p>
          </li>
        </div>
      );
    
  }