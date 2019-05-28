import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getParam } from '../router';

import {
  playlistsSelector,
  fetchPlaylists,
} from '../redux/modules/playlists';

import {
  commentsSelector,
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

const Playlists = React.memo(({ isOpen, history }) => {
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
      console.log(playlistId)
      // TODO open modal and ask if they are sure
      return;
    }

    // TODO this will still add on history even if its the same playlist
    history.push(`/playlists/${playlistId}`);
  }

  return (
    <PlaylistsContainer isOpen={isOpen}>
      { !isLoading ?
        playlists.map((playlist) => {
          // sloppy as - TODO clean up this code
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