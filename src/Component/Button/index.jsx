import React from "react";

const Button = ({ onClick, children, disabled, testID, className }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      data-testid={testID}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
