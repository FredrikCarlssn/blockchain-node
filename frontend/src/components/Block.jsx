
import Transaction from "./Transaction";

export default function Block(props) {
let transactionList = [];

if (props.block.transaction) {
  transactionList = props.block.transaction.map((transaction, i) => {
    return <Transaction transaction={transaction} key={i} index={i} />;
  });
}

    return (
      <div className="block p-4">
        <h2 className="">Block {props.block.index} </h2>
        <li className="block-list">
          <p>
            <b>Timestamp:</b>  {props.block.timestamp}
          </p>
          <p>
            <b>Hash:</b>  {props.block.hash}
          </p>
          <p>
             <b>Transactions:</b>  {transactionList} 
          </p>
          <p>
            <b>Last hash:</b>  {props.block.previousBlockHash}
          </p>
        </li>
      </div>
    );
  
}