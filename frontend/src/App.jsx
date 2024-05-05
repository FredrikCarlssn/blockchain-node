import React, { useState, useEffect } from 'react'
import './App.css'    
import Blockchain from './components/Blockchain'
import AddTransaction from './components/AddTransaction'
import Validation from './components/Validation'
import PendingTransactions from './components/PendingTransactions'
import BlockById from './components/BlockById'
import { getPendingTransactions, getBlockchain } from './services/blockchainAPI.js';

function App() {

  const [ blockchain, setBlockchain ] = useState([]);
  const [ pendingTransactions, setPendingTransactions] = useState([]);

  const fetchBlockchain = async () => {
    try {
      const blockchainData = await getBlockchain();
      setBlockchain(blockchainData);
    } catch (error) {
      console.error('Error fetching blockchain:', error);
    }
  };

  const fetchPendingTransactions = async () => {
    try {
      const data = await getPendingTransactions();
      setPendingTransactions(data.data);
    } catch (error) {
      console.error('Error fetching pending transactions:', error);
      setPendingTransactions([]);
    }
  };

  useEffect(() => {
    fetchPendingTransactions();
    fetchBlockchain();
  }, []);

  return (
      <div className='background'>
        <h1 className='jersey-25-charted-regular text-6xl text-white font-bold py-4 px-6 rounded-lg shadow-lg '>Welcome to your only Blockchain validator</h1>
        <div className='content-container'>
          <div className='container'> 
          <Blockchain blockchain={blockchain}/>
         </div>
          <div className=" container"  >
            <AddTransaction fetchPendingTransactions={fetchPendingTransactions} />
            <PendingTransactions pendingTransactions={pendingTransactions} fetchPendingTransactions={fetchPendingTransactions} fetchBlockchain={fetchBlockchain}/>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
        <div className='w-full h-52 '>
          <BlockById />
        </div>
        </div>
        <Validation />
      </div>
  )
}

export default App
