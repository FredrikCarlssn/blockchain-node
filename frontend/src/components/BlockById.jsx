import React, { useState } from 'react';
import Block from './Block'; 
import { getBlockById } from '../services/blockchainAPI';

export default function FindBlock() {
  const [id, setId] = useState('');
  const [block, setBlock] = useState(null);
  const [errMsg, setErrMsg] = useState(null)
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = ""
    try {
        response = await getBlockById(id)
        setErrMsg("");
        setOpen(true)
    } catch (error) {
      setErrMsg("No block to display with this hash")
        console.log(error);    
        setBlock(null);
        setOpen(false)
    }
    
    //const data = await response.json();
    setBlock(response); 
  };
  
  const closeModal = () => {
    setOpen(false)
   }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="mr-2 font-bold text-xl">
          Enter block hash:
        </label>
          <input className="mr-2 p-2" type="text " value={id} onChange={(e) => setId(e.target.value)} /> 
        <button className="w-32 rounded" type="submit">Find Block</button>
      </form>
      <div>
      </div>
      {errMsg && <p>{errMsg}</p>}
     
      {open && <div  className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center min-h-screen">
      
      <div className=" p-4 rounded-lg shadow-lg text-center w-1/3 h-64 flex items-center justify-center flex-col z-50 list-none">
      {block && <Block block={block} />}
  
      <button
            onClick={closeModal}
            class="mt-4 px-4 py-2 bg-custom-green text-white rounded hover:bg-custom-green-dark z-50"
          >
            Close
          </button>
      </div>
      </div>}
</div>
  );
}
