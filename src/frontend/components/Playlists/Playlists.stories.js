import React from 'react';
import { storiesOf } from '@storybook/react';
import Playlists from './Playlists';
import { withDarkTheme, withLightTheme } from '../../.storybook/utils';

storiesOf('Playlists', module)
  .add(
    'Light theme',
    withLightTheme(() => {
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
    }),
  )
  .add(
    'Dark theme',
    withDarkTheme(() => {
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
    }),
  )
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
