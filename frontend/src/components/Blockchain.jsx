  import React, { useState, useEffect } from 'react';
  import Block from './Block';
  import { getBlockchain } from '../services/blockchainAPI.js';

  export default function Blockchain(props) {
    const [blockchain, setBlockchain] = useState([]);

    console.log("blockchain", blockchain);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const blockchainData = await getBlockchain();
          setBlockchain(blockchainData);
        } catch (error) {
          console.error('Error fetching blockchain:', error);
        }
      };

      fetchData();
    }, []);

    let blockchainList = []

    if (blockchain) {
      blockchainList = blockchain.map((block, i) => {
        return <Block block={block} key={i} index={i} />;
      });
      console.log("blockchainLIst",blockchainList);
    }

    return (
      <>
        <h1>Blockchain</h1>
        <ul>{blockchainList}</ul>
        {blockchainList.length === 0 && (
          <div>
            <p>No blockchain to display</p>
          </div>
        )}
      </>
    );
  }
