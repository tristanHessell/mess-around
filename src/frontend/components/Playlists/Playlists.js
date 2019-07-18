import React from 'react';
import { PlaylistsContainer, PlaylistButton } from './styles';

const Playlists = React.memo(
  ({ isLoading, playlists, currentPlaylist, onClickPlaylist }) => {
    return (
      <PlaylistsContainer>
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
      </PlaylistsContainer>
    );
  },
);

Playlists.displayName = 'Playlists';

export default Playlists;
