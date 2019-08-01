import React from 'react';
import Modal from '../Modal';
import { useDispatch } from 'react-redux';
import { navigate } from '@reach/router';

import { saveComments } from '../../redux/comments/actions';

import { hideModal } from '../../redux/modal/actions';

const SaveWarningModal = React.memo(
  ({ message, playlistId, currentPlaylistId }) => {
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
      <Modal isOpen onClose={onClose}>
        {message}
        <button
          onClick={async () => {
            await onClickYes();
            onClose();
          }}
        >
          Yes
        </button>
        <button
          onClick={async () => {
            await onClickNo();
            onClose();
          }}
        >
          No
        </button>
        <button onClick={onClose}>Cancel</button>
      </Modal>
    );
  },
);

SaveWarningModal.displayName = 'SaveWarningModal';

export default SaveWarningModal;
