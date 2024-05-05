import React, { useState, useEffect } from 'react'

export default function Validation() {
    const [isValid, setIsValid] = useState(null)
    // const [validating, setValidating] = useState(false)

    // const handleValidation = () => {
    //     setValidating(true)
    // try {
    //   const result = await validateBlockchain();

    // }

    useEffect(() => {
        function validateBlockchain() {
            for (let i = 0; i < props.blockchain.length; i++) {

              if(props.blockchain[i].hash !== props.blockchain[i].calculateHash()) {
                setIsValid(false)
                return;
              }
            }
            setIsValid(true)
        }
        validateBlockchain()
    }, [props.blockchain]);

    return (
        <div>
           {isValid === null ? "Validating Blockchain..." : isValid ? "Blockchain is Valid" : "Blockchain is Invalid"}
        </div>
    )
}