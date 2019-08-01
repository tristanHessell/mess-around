import React from 'react';
import Modal from '../Modal';

const LoadingModal = React.memo(() => {
  return <Modal isOpen>LoadingMODAL</Modal>;
});

LoadingModal.displayName = 'LoadingModal';

export default LoadingModal;
