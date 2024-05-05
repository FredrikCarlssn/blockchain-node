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
      <div className='overflow: clip  '>
        <h1>Blockchain</h1>
        <ul>{blockchainList}</ul>
        {blockchainList.length === 0 && (
          <div>
            <p>No blockchain to display</p>
          </div>
        )}
      </div>
    );
  }
