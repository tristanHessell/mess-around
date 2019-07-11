import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

import { hideModal } from '../../redux/modal/actions';

// TODO actually try to cancel if they click cancel?

const SaveWarningModal = React.memo(({ message }) => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(hideModal());
  };

  return (
    <Modal isOpen onRequestClose={onClose}>
      SAVING MODAL
      {message}
    </Modal>
  );
});

export default SaveWarningModal;
