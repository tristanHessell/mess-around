import React from 'react';
import Modal from 'react-modal';

const LoadingModal = React.memo(() => {
  return <Modal isOpen>LoadingMODAL</Modal>;
});

LoadingModal.displayName = 'LoadingModal';

export default LoadingModal;
