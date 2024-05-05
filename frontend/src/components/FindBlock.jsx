import React, { useState } from 'react';
import Block from './Block'; 

export default function FindBlock() {
  const [id, setId] = useState('');
  const [block, setBlock] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getBlockById(id)
    const data = await response.json();
    setBlock(data); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Block ID:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <button type="submit">Find Block</button>
      </form>
      {block && <Block block={block} />}
    </div>
  );
}
