import React from 'react';

import { StyledCarousel } from './styles';

const Carousel = React.memo(
  ({ onChange = () => {}, selectedIndex, children }) => {
    const selectedItem = selectedIndex === undefined ? 0 : selectedIndex;
    return (
      <StyledCarousel
        data-test="carousel"
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        selectedItem={selectedItem}
        onChange={(index) => onChange(index)}
      >
        {children}
      </StyledCarousel>
    );
  },
);

Carousel.displayName = 'Carousel';

export default Carousel;
