import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';

import { getParam } from '../router';

import {
  playlistsSelector,
  fetchPlaylists,
} from '../redux/modules/playlists';

import {
  commentsSelector,
  storeComments,
} from '../redux/modules/comments';

// TODO play around with css animations
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

// TODO move modal & pending playlist stuff to redux ui area
// TODO or change to using Prompt (react-router)
const Playlists = React.memo(({ isOpen, history }) => {
  const [pendingChangePlaylist, setPendingChangePlaylist] = useState();
  const { playlists, isLoading } = useSelector(playlistsSelector);
  const comments = useSelector(commentsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPlaylist () {
      await dispatch(fetchPlaylists());
    }

    getPlaylist();
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
    history.push(`/playlists/${playlistId}`);
  }

  const onClickYes = async () => {
    await dispatch(storeComments());
    history.push(`/playlists/${pendingChangePlaylist}`);
    setPendingChangePlaylist();
  };

  const onClickNo = () => {
    history.push(`/playlists/${pendingChangePlaylist}`);
    setPendingChangePlaylist();
  };

  const onClickCancel = () => {
    setPendingChangePlaylist();
  };

  return (
    <PlaylistsContainer isOpen={isOpen}>
      <Modal
        isOpen={!!pendingChangePlaylist}
        onRequestClose={() => {
          setPendingChangePlaylist(false);
        }}
      >
        <button onClick={onClickYes}>Yes</button>
        <button onClick={onClickNo}>No</button>
        <button onClick={onClickCancel}>Cancel</button>
      </Modal>
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
      : 'loading...'}
    </PlaylistsContainer>
  );
});

export default withRouter(Playlists);