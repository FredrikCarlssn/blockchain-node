import React, { useState, useEffect } from 'react';
import Transaction from "./Transaction";
import { getPendingTransactions, mineBlock } from '../services/blockchainAPI.js';

export default function PendingTransactions(props) {
   
    
    const mine = () => {
      mineBlock();
      props.fetchPendingTransactions()
      props.fetchBlockchain()
    }

    let pendingTransactionsList = []
    
         pendingTransactionsList = props.pendingTransactions.map((transaction, i) => {
        return <Transaction transaction={transaction} key={i} index={i} />;
      });


    return (
      <div className="border-2 rounded-2xl border-slate-500 m-2 p-4 overflow-auto h-[50%] ">
        <h1 className="font-bold text-4xl">Pending Transactions</h1>
        <ul>{pendingTransactionsList}</ul>
        {pendingTransactionsList.length === 0 && (
          <div>
            <p className="italic">No pending Transactions to display</p>
          </div>
        )}
        <button className=" w-40 h-10 mb-4 mt-4" onClick={mine}>Mine</button>
      </div>
    );
  }

