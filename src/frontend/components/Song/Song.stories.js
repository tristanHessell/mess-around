import React from 'react';
import { storiesOf } from '@storybook/react';
import Song from './Song';

import { withDarkTheme, withLightTheme } from '../../.storybook/utils';

storiesOf('Song', module)
  .add(
    'Light theme',
    withLightTheme(() => {
      const song = {
        songId: '',
        name: 'Song Name',
        artists: [],
      };
      const comment = 'comment1';

      return <Song song={song} comment={comment} />;
    }),
  )
  .add(
    'Dark theme',
    withDarkTheme(() => {
      const song = {
        songId: '',
        name: 'Song Name',
        artists: [],
      };
      const comment = 'comment1';

      return <Song song={song} comment={comment} />;
    }),
  );
