import React from 'react';
import { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '../useTheme';
import { AppWrapper } from '../styles';

// eslint-disable-next-line react/display-name
export const withLightTheme = (storyFn) => () => (
  <ThemeProvider theme={lightTheme}>
    <AppWrapper>{storyFn()}</AppWrapper>
  </ThemeProvider>
);

// eslint-disable-next-line react/display-name
export const withDarkTheme = (storyFn) => () => (
  <ThemeProvider theme={darkTheme}>
    <AppWrapper>{storyFn()}</AppWrapper>
  </ThemeProvider>
);
