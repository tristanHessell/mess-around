import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from '@reach/router';

import { playlistSelector } from '../../redux/playlist/selectors';
import { playlistsSelector } from '../../redux/playlists/selectors';
import { fetchPlaylists } from '../../redux/playlists/actions';
import { commentsSelector } from '../../redux/comments/selectors';
import { showModal } from '../../redux/modal/actions';

import Playlists from './Playlists';

const PlaylistsContainer = React.memo(() => {
  const { playlists, isLoading } = useSelector(playlistsSelector);
  const currentPlaylist = useSelector(playlistSelector);
  const comments = useSelector(commentsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPlaylists() {
      await dispatch(fetchPlaylists());
    }

    getPlaylists();
  }, [dispatch]);

  const onClickPlaylist = async (currentPlaylistId, playlistId) => {
    if (currentPlaylistId === playlistId) {
      return;
    }

    if (Object.keys(comments.changes).length) {
      dispatch(
        showModal({
          modalType: 'SAVE_WARNING_MODAL', //TODO change this showModal call to be a showSaveWarningModal or something
          modalProps: {
            message:
              'You have unsaved changes. Do you want to save your changes before leaving?',
            currentPlaylistId,
            playlistId,
          },
        }),
      );

      return;
    }

    // this will still add on history even if its the same playlist (although earlier code prevents this)
    navigate(`/playlists/${playlistId}`);
  };

  return (
    <Playlists
      playlists={playlists}
      isLoading={isLoading}
      currentPlaylist={currentPlaylist}
      onClickPlaylist={onClickPlaylist}
    />
  );
});

PlaylistsContainer.displayName = 'PlaylistsContainer';

export default PlaylistsContainer;
