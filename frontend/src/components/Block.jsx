import Transaction from "./Transaction";

export default function Block(props) {
  let transactionList = [];

  if (props.block.transactions) {
    transactionList = props.block.transactions.map((transaction, i) => {
      return <Transaction transaction={transaction} key={i} index={i} />;
    });
  }

  return (
    <div className=" p-4  rounded-3xl  border-slate-500 mb-5  bg-white bg-opacity-25 ">
      <h2 className=" text-1xl font-bold">Block {props.block.index} </h2>
      <li className="block-list">
        <p>
          <b className="font-bold">Timestamp:</b> {props.block.timestamp}
        </p>
        <p>
          <b className="font-bold">Hash:</b> {props.block.hash}
        </p>
        <p>
          <b className="font-bold">Last hash:</b>{" "}
          {props.block.previousBlockHash}
        </p>
        <p>
          <b className="font-bold items-center">Transactions:</b>{" "}
          {transactionList}
        </p>
      </li>
    </div>
  );
}
