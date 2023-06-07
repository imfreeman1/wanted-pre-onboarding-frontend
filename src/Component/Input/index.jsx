import React from "react";

const Input = ({ placeholder, value, onChange, type }) => {
  return <input type={type} placeholder={placeholder} value={value} onChange={onChange} />;
};

export default Input;
