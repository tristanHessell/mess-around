import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

import { withDarkTheme, withLightTheme } from '../../.storybook/utils';

storiesOf('Button', module)
  .add(
    'Light theme',
    withLightTheme(() => {
      return <Button>Blah</Button>;
    }),
  )
  .add(
    'Dark theme',
    withDarkTheme(() => {
      return <Button>Blah</Button>;
    }),
  );
