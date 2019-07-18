import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from '@reach/router';

import { playlistSelector } from '../../redux/playlist/selectors';
import { playlistsSelector } from '../../redux/playlists/selectors';
import { fetchPlaylists } from '../../redux/playlists/actions';
import { commentsSelector } from '../../redux/comments/selectors';
import { showModal } from '../../redux/modal/actions';

import { PlaylistsContainer, PlaylistButton } from './styles';

const Playlists = React.memo(() => {
  const { playlists, isLoading } = useSelector(playlistsSelector);
  const playlist = useSelector(playlistSelector);
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
    <PlaylistsContainer>
      <div>Playlists</div>
      {!isLoading
        ? playlists.map((playlistSummary, index) => {
            const currentPlaylistId = playlist && playlist.id;
            const isSelected = currentPlaylistId === playlistSummary.id;

            return (
              <PlaylistButton
                data-test={`playlist-button-${index}`}
                key={playlistSummary.id}
                onClick={() =>
                  onClickPlaylist(currentPlaylistId, playlistSummary.id)
                }
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

Playlists.displayName = 'Playlists';

export default Playlists;
