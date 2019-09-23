import React from 'react';
import { storiesOf } from '@storybook/react';
import User from './User';

import { withDarkTheme, withLightTheme } from '../../.storybook/utils';

storiesOf('User', module)
  .add(
    'Light theme',
    withLightTheme(() => {
      const name = 'test';

      return <User name={name} />;
    }),
  )
  .add(
    'Dark theme',
    withDarkTheme(() => {
      const name = 'test';

      return <User name={name} />;
    }),
  );
