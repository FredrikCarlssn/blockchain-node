  import React, { useState, useEffect } from 'react';
  import Block from './Block';
  import { getBlockchain } from '../services/blockchainAPI.js';

  export default function Blockchain(props) {


    let blockchainList = []

    if (props.blockchain) {
      blockchainList = props.blockchain.map((block, i) => {
        return <Block block={block} key={i} index={i} />;
      });
    }

    return (
      <div className=' border-2 rounded-2xl border-slate-500  p-4 m-3 overflow-auto h-[100vh] '>
        <h1 className=' font-bold text-4xl mb-3'>Blockchain</h1>
        <ul>{blockchainList}</ul>
        {blockchainList.length === 0 && (
          <div>
            <p>No blockchain to display</p>
          </div>
        )}
      </div>
    );
  }
