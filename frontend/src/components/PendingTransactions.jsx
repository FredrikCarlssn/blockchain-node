import React, { useState, useEffect } from 'react';
import Transaction from "./Transaction";
import { getPendingTransactions, mineBlock } from '../services/blockchainAPI.js';

export default function PendingTransactions() {
    const [pendingTransactions, setPendingTransactions] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getPendingTransactions();
          setPendingTransactions(data.data);
        } catch (error) {
          console.error('Error fetching pending transactions:', error);
          setPendingTransactions([]);
        }
      };

      fetchData();
    }, []);
    
    
    
    const mine = () => {
      mineBlock();
    }

    let pendingTransactionsList = []
    
         pendingTransactionsList = pendingTransactions.map((transaction, i) => {
        return <Transaction transaction={transaction} key={i} index={i} />;
      });


    return (
      <div className="border-2 border-red-600">
        <h1 className="font-bold ">Pending Transactions</h1>
        <ul>{pendingTransactionsList}</ul>
        {pendingTransactionsList.length === 0 && (
          <div>
            <p className="italic">No pending Transactions to display</p>
          </div>
        )}
        <button className="bg-gray-800 w-40 h-10 mb-4 mt-4" onClick={mine}>Mine</button>
      </div>
    );
  }

