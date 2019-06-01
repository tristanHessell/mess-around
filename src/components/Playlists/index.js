import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';

import { getParam } from '../../router';

import {
  playlistsSelector,
  fetchPlaylists,
} from '../../redux/modules/playlists';

import {
  commentsSelector,
  storeComments,
} from '../../redux/modules/comments';

const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const PlaylistButton = styled.div`
  background-color: gray;
  color: ${(props) => props.selected ? 'red' : 'black'};
`;

const LeaveWarningModal = React.memo(({ playlistId, isOpen, onClose, onClickYes, onClickNo }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      You have unsaved changes. Do you want to save your changes before leaving?
      <button onClick={() => { onClickYes(playlistId); onClose();}}>Yes</button>
      <button onClick={() => { onClickNo(playlistId); onClose();}}>No</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
})

const Playlists = React.memo(({ isOpen, history }) => {
  // TODO i dont like this pending state here
  const [pendingChangePlaylist, setPendingChangePlaylist] = useState();
  const { playlists, isLoading } = useSelector(playlistsSelector);
  const comments = useSelector(commentsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPlaylists () {
      await dispatch(fetchPlaylists());
    }

    getPlaylists();
  }, [dispatch]);

  const onClickPlaylist = async (playlistId) => {
    if (getParam(history, `/playlists/:id`) === playlistId) {
      return;
    }

    if (Object.keys(comments.changes).length) {
      setPendingChangePlaylist(playlistId);
      return;
    }

    // this will still add on history even if its the same playlist (although earlier code prevents this)
    changePlaylist(playlistId);
  }

  const changePlaylist = (playlistId) => {
    history.push(`/playlists/${playlistId}`);
  };

  return (
    <PlaylistsContainer>
      <LeaveWarningModal
        playlistId={pendingChangePlaylist}
        isOpen={!!pendingChangePlaylist}
        onClose={() => setPendingChangePlaylist()}
        onClickYes={async (playlistId) => {
          await dispatch(storeComments(playlistId));
          changePlaylist(playlistId);
        }}
        onClickNo={changePlaylist}
      />
      { !isLoading ?
        playlists.map((playlist) => {
          const isSelected = getParam(history, `/playlists/:id`) === playlist.id;
          return (
            <PlaylistButton
              key={playlist.id}
              onClick={() => onClickPlaylist(playlist.id)}
              selected={isSelected}
            >
              {playlist.name}
            </PlaylistButton>
          );
        })
      : '...Loading'}
    </PlaylistsContainer>
  );
});

export default withRouter(Playlists);