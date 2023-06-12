import React from "react";

const Input = ({
  className,
  placeholder,
  value,
  onChange,
  onBlur,
  type,
  checked,
  testID,
}) => {
  return (
    <input
      onBlur={onBlur}
      className={className}
      checked={checked}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      data-testid={testID}
    />
  );
};

export default React.memo(Input);
