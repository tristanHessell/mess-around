import React from 'react';
import { storiesOf } from '@storybook/react';
import Playlists from './Playlists';

storiesOf('Playlists', module)
  .add('No selected playlist', () => {
    const playlists = [
      {
        name: 'Playlist1',
        id: 0,
      },
    ];
    const onClickPlaylist = () => {};
    return (
      <Playlists playlists={playlists} onClickPlaylist={onClickPlaylist} />
    );
  })
  .add('With selected playlist', () => {
    const playlists = [
      {
        name: 'Playlist1',
        id: 0,
      },
    ];
    const currentPlaylist = {
      id: 0,
    };
    const onClickPlaylist = () => {};
    return (
      <Playlists
        playlists={playlists}
        currentPlaylist={currentPlaylist}
        onClickPlaylist={onClickPlaylist}
      />
    );
  });
