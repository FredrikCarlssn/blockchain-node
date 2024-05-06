import React, { useState } from "react";

import { validateBlockchain } from "../services/blockchainAPI.js";

export default function Validation() {
  const [isValid, setIsValid] = useState(null);
  const [validating, setValidating] = useState(false);

  const handleValidation = async () => {
    setValidating(true);
    try {
      const result = await validateBlockchain();
      setIsValid(result.success);
    } catch (error) {
      console.error("Error validating blockchain:", error);
      setIsValid(false);
    } finally {
      setValidating(false);
    }
  };

  let buttonText = "Validate Blockchain";
  if (validating) {
    buttonText = "Validating...";
  } else if (isValid === true) {
    buttonText = "Blockchain Valid";
  } else if (isValid === false) {
    buttonText = "Blockchain Invalid";
  }

  return (
    <button
      className={`${
        isValid === null ? "validationDefault" : isValid ? "valid" : "notValid"
      } border-4 validationButton`}
      onClick={handleValidation}
      disabled={validating}
    >
      {buttonText}
    </button>
  );
}
