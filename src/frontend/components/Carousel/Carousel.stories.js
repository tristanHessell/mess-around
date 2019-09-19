import React from 'react';
import { storiesOf } from '@storybook/react';
import Carousel from './Carousel';
import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from '../../useTheme';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

storiesOf('Carousel', module)
  .addDecorator((storyFn) => <div style={{ height: '100px' }}>{storyFn()}</div>)
  .add('default configuration', () => {
    const items = [1, 2, 3];
    return (
      <ThemeProvider theme={lightTheme}>
        <Carousel>{items}</Carousel>
      </ThemeProvider>
    );
  })
  .add('with custom selected index', () => {
    const items = [1, 2, 3];
    return (
      <ThemeProvider theme={lightTheme}>
        <Carousel selectedIndex={1}>{items}</Carousel>
      </ThemeProvider>
    );
  })
  .add('with dark theme', () => {
    const items = [1, 2, 3];
    return (
      <ThemeProvider theme={darkTheme}>
        <Carousel selectedIndex={1}>{items}</Carousel>
      </ThemeProvider>
    );
  });
