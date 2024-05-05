
export default function Transaction(props) {
    if (props.transaction && props.transaction.length > 0) {
        //const transaction = JSON.parse(transaction);
      return (
        <>
          <li>
            <p>
              <b>Timestamp:</b> <br /> {props.transaction.fromAddress}
            </p>
            <p>
              <b>Hash:</b> <br /> {props.transaction.toAddress}
            </p>
            <p>
              <b>Data:</b> <br /> {props.transaction.amount}
            </p>
          </li>
        </>
      );
    }
  }