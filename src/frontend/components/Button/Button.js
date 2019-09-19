import React from 'react';

import { StyledButton } from './styles';

const Button = React.memo(({ children, onClick, disabled, testIdentifier }) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      data-test={testIdentifier}
    >
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export default Button;
