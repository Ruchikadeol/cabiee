import React from "react";

const PrimaryButton = ({ children, onClick, disabled=false, className='' }) => {
  return (
    <>
      <button  onClick={onClick} disabled={disabled} className={`primary-button ${className}`}>
        {children}
      </button>
    </>
  );
};

export default PrimaryButton;
