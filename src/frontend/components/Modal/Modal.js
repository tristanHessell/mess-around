import React from 'react';

import { StyledModal } from './styles';

const Modal = React.memo((props) => {
  return (
    <StyledModal
      {...props}
      afterClose={props.onClose}
      onBackgroundClick={props.onClose}
    >
      {props.children}
    </StyledModal>
  );
});

Modal.displayName = 'Modal';

export default Modal;
