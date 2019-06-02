import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import Modal from 'react-modal';

import {
  playlistSelector,
} from '../../redux/modules/playlist';

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

const Playlists = React.memo(() => {
  const [pendingChangePlaylist, setPendingChangePlaylist] = useState();
  const { playlists, isLoading } = useSelector(playlistsSelector);
  const playlist = useSelector(playlistSelector);
  const comments = useSelector(commentsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPlaylists () {
      await dispatch(fetchPlaylists());
    }

    getPlaylists();
  }, [dispatch]);

  const onClickPlaylist = async (currentPlaylistId, playlistId) => {
    if (currentPlaylistId === playlistId) {
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
    navigate(`/playlists/${playlistId}`);
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
      <div>
        Playlists
      </div>
      { !isLoading ?
        playlists.map((playlistSummary) => {
          const currentPlaylistId = playlist && playlist.id;
          const isSelected = currentPlaylistId === playlistSummary.id;

          return (
            <PlaylistButton
              key={playlistSummary.id}
              onClick={() => onClickPlaylist(currentPlaylistId, playlistSummary.id)}
              selected={isSelected}
            >
              {playlistSummary.name}
            </PlaylistButton>
          );
        })
      : '...Loading'}
    </PlaylistsContainer>
  );
});

export default Playlists;