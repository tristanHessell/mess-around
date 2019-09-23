import React from 'react';
import { storiesOf } from '@storybook/react';
import Carousel from './Carousel';
import { withDarkTheme, withLightTheme } from '../../.storybook/utils';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

storiesOf('Carousel', module)
  .addDecorator((storyFn) => <div style={{ height: '100px' }}>{storyFn()}</div>)
  .add(
    'default configuration',
    withLightTheme(() => {
      const items = [1, 2, 3];
      return <Carousel>{items}</Carousel>;
    }),
  )
  .add(
    'with custom selected index',
    withLightTheme(() => {
      const items = [1, 2, 3];
      return <Carousel selectedIndex={1}>{items}</Carousel>;
    }),
  )
  .add(
    'with dark theme',
    withDarkTheme(() => {
      const items = [1, 2, 3];
      return <Carousel selectedIndex={1}>{items}</Carousel>;
    }),
  );
