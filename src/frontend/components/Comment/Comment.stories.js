import React from 'react';
import { storiesOf } from '@storybook/react';
import Comment from './Comment';

import { withDarkTheme, withLightTheme } from '../../.storybook/utils';

storiesOf('Comment', module)
  .add(
    'Light theme',
    withLightTheme(() => {
      const comment = 'Comment1';
      return <Comment comment={comment} />;
    }),
  )
  .add(
    'Dark theme',
    withDarkTheme(() => {
      const comment = 'Comment2';
      return <Comment comment={comment} />;
    }),
  );
