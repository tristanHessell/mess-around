import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { navigate } from '@reach/router';

import {
  saveComments,
} from '../../redux/modules/comments';

import {
  hideModal,
} from '../../redux/modules/modal';

const SaveWarningModal = React.memo(({ message, playlistId, currentPlaylistId }) => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(hideModal());
  };
  const onClickYes = async () => {
    await dispatch(saveComments(currentPlaylistId));
    navigate(`/playlists/${playlistId}`);
  };
  const onClickNo = () => {
    navigate(`/playlists/${playlistId}`);
  };

  return (
    <Modal
      isOpen
      onRequestClose={onClose}
    >
      {message}
      <button onClick={async () => { await onClickYes(); onClose();}}>Yes</button>
      <button onClick={async () => { await onClickNo(); onClose();}}>No</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
})

export default SaveWarningModal;
