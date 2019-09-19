import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Button from './Button';

import { darkTheme, lightTheme } from '../../useTheme';

storiesOf('Button', module)
  .add('Light theme', () => {
    return (
      <ThemeProvider theme={lightTheme}>
        <Button>Blah</Button>
      </ThemeProvider>
    );
  })
  .add('Dark theme', () => {
    return (
      <ThemeProvider theme={darkTheme}>
        <Button>Blah</Button>
      </ThemeProvider>
    );
  });
