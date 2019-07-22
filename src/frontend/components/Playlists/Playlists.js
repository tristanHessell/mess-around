import React from 'react';
import { PlaylistsWrapper, PlaylistButton } from './styles';

const Playlists = React.memo(
  ({ isLoading, playlists, currentPlaylist, onClickPlaylist }) => {
    return (
      <PlaylistsWrapper>
        <div>Playlists</div>
        {!isLoading
          ? playlists.map((playlistSummary, index) => {
              const currentPlaylistId = currentPlaylist && currentPlaylist.id;
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
      </PlaylistsWrapper>
    );
  },
);

Playlists.displayName = 'Playlists';

export default Playlists;
