import React, { useState } from 'react';
import Block from './Block'; 
import { getBlockById } from '../services/blockchainAPI';

export default function FindBlock() {
  const [id, setId] = useState('');
  const [block, setBlock] = useState(null);
  const [errMsg, setErrMsg] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = ""
    try {
        response = await getBlockById(id)
        setErrMsg("");
    } catch (error) {
      setErrMsg("No block to display with this hash")
        console.log(error);    
        setBlock(null);
    }
    
    //const data = await response.json();
    setBlock(response); 
  };

  return (
    <div className="mt-36">
      <form onSubmit={handleSubmit}>
        <label className="ml-2">
          Enter block hash:
          <input className="mr-2" type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <button type="submit">Find Block</button>
      </form>
      {block && <Block block={block} />}
      {errMsg && <p>{errMsg}</p>}
    </div>
  );
}
