import React, { useRef } from "react";
import './input.scss'
function Input() {

  const inputRef = useRef(null);

  return (
    <div className="custom">
      <input
        ref={inputRef}
        type="text"
        className="custom-input"
        placeholder="Prénom"
      />
    </div>
  );
}

export default Input;
