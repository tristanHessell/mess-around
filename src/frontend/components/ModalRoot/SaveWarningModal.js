import React from 'react';
import Modal from '../Modal';
import { useDispatch } from 'react-redux';
import { navigate } from '@reach/router';

import { saveComments } from '../../redux/comments/actions';
import Button from '../Button';

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
        <Button
          onClick={async () => {
            await onClickYes();
            onClose();
          }}
        >
          Yes
        </Button>
        <Button
          onClick={async () => {
            await onClickNo();
            onClose();
          }}
        >
          No
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Modal>
    );
  },
);

SaveWarningModal.displayName = 'SaveWarningModal';

export default SaveWarningModal;
