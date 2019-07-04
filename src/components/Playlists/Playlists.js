import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { navigate } from '@reach/router';

import {
  playlistSelector,
} from '../../redux/playlist/selectors';

import {
  playlistsSelector,
} from '../../redux/playlists/selectors';

import {
  fetchPlaylists,
} from '../../redux/playlists/actions';

import {
  commentsSelector,
} from '../../redux/comments/selectors';

import {
  showModal,
} from '../../redux/modal/actions';

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

function areaDispatch (store, area) {
  return (action) => {
    if (typeof action === 'function') {
      return action(areaDispatch(store, area))
    }

    store.dispatch({
      ...action,
      area,
    });
  }
}

const Playlists = React.memo(() => {
  const { playlists, isLoading } = useSelector(playlistsSelector('billing.home.entries'));
  const playlist = useSelector(playlistSelector);
  const comments = useSelector(commentsSelector);
  // const dispatch = useDispatch();
  const store = useStore();
  const dispatch = useMemo(() => areaDispatch(store, 'billing.home.entries'), [store]);

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
      dispatch(showModal({
        modalType: 'SAVE_WARNING_MODAL', //TODO change this showModal call to be a showSaveWarningModal or something
        modalProps: {
          message: 'You have unsaved changes. Do you want to save your changes before leaving?',
          currentPlaylistId,
          playlistId,
        },
      }));

      return;
    }

    // this will still add on history even if its the same playlist (although earlier code prevents this)
    navigate(`/playlists/${playlistId}`);
  }

  return (
    <PlaylistsContainer>
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