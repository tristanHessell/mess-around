import React from 'react';

import { StyledCarousel } from './styles';

const Carousel = React.memo(
  ({ onChange = () => {}, selectedIndex, children }) => {
    const selectedItem = selectedIndex === undefined ? 0 : selectedIndex;
    return (
      <StyledCarousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        selectedItem={selectedItem}
        onChange={(index) => onChange(children[index])}
      >
        {children}
      </StyledCarousel>
    );
  },
);

Carousel.displayName = 'Carousel';

export default Carousel;
