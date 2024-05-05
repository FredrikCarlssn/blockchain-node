import React, { useState, useEffect } from 'react'

import { validateBlockchain } from '../services/blockchainAPI.js';

export default function Validation() {
    const [isValid, setIsValid] = useState(null)
    const [validating, setValidating] = useState(false)

    const handleValidation = async () => {
        setValidating(true)
    try {
      const result = await validateBlockchain();
      setIsValid(result.success);
      setValidating(false);
    } catch (error) {
      console.error('Error validating blockchain:', error);
      setValidating(false);
      setIsValid(false);

    }

    }

    // useEffect(() => {
    //     function validateBlockchain() {
    //         for (let i = 0; i < props.blockchain.length; i++) {

    //           if(props.blockchain[i].hash !== props.blockchain[i].calculateHash()) {
    //             setIsValid(false)
    //             return;
    //           }
    //         }
    //         setIsValid(true)
    //     }
    //     validateBlockchain()
    // }, [props.blockchain]);


    return (
      <div>
        <button className={`border-${isValid ? 'green' : 'red'}-500 border-2`} onClick={handleValidation} disabled={validating}>
          {validating ? "Validating..." : "Validate Blockchain"}
        </button>
      </div>
    );
}