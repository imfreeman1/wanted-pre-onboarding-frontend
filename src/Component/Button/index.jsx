import React from "react";
import { StyledButton } from "./style";

const Button = ({ onClick, children, disabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
