import React from "react";

const Input = ({ placeholder, value, onChange, type, checked }) => {
  return (
    <input
      checked={checked}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default React.memo(Input);
