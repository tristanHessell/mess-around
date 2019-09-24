import React from 'react';
import { storiesOf } from '@storybook/react';
import Artists from './Artists';

import { withDarkTheme, withLightTheme } from '../../.storybook/utils';

storiesOf('Artists', module)
  .add(
    'Light theme',
    withLightTheme(() => {
      const artists = [
        {
          id: 'id-1',
          name: 'Artist One',
        },
      ];
      return <Artists artists={artists} />;
    }),
  )
  .add(
    'Dark theme',
    withDarkTheme(() => {
      const artists = [
        {
          id: 'id-1',
          name: 'Artist One',
        },
      ];
      return <Artists artists={artists} />;
    }),
  )
  .add(
    'With multiple artists',
    withLightTheme(() => {
      const artists = [
        {
          id: 'id-1',
          name: 'Artist One',
        },
        {
          id: 'id-2',
          name: 'Artist Two',
        },
      ];
      return <Artists artists={artists} />;
    }),
  );
