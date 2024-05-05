import React, { useState, useEffect } from 'react';
import Transaction from "./Transaction";
import { getPendingTransactions } from '../services/blockchainAPI.js';

export default function PendingTransactions() {
    const [pendingTransactions, setPendingTransactions] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const pendingTransactionsData = await getPendingTransactions();
          setPendingTransactions(pendingTransactionsData);
        } catch (error) {
          console.error('Error fetching pending transactions:', error);
        }
      };

      fetchData();
    }, []);

    let pendingTransactionsList = ""

    if (pendingTransactions) {
      pendingTransactionsList = pendingTransactions.map((transaction, i) => {
        return <Transaction transaction={transaction} key={i} index={i} />;
      });
    }

    return (
      <>
        <h1>pendingTransactions</h1>
        <ul>{pendingTransactionsList}</ul>
        {pendingTransactionsList.length === 0 && (
          <div>
            <p>No pendingTransactions to display</p>
          </div>
        )}
      </>
    );
  }

