import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

export const StyledCarousel = styled(Carousel)`
  height: 100%;
  display: flex;
  flex-direction: column;

  /*
   * this selector is needed as the carousel library has a div there so that it can
   * place the custom class name onto it. Unfortunately, the div is still placed there even
   * if you dont want to use a custom class.
   */
  & > div {
    height: 100%;
    display: flex;
    color: ${(props) => props.theme.fg};
  }

  .carousel {
    flex: 1;
  }

  .carousel > .slider-wrapper {
    height: 100%;
  }

  .carousel > .slider-wrapper > .slider.animated {
    height: 100%;
  }

  /*
   * double ampersands are doing what you would expect: creating a selector of itself twice.
   * this is a handy way increase the specificity of the selector without havign to resort to !important.
  */
  && .carousel > .control-arrow {
    background-color: ${(props) => props.theme.bg};
  }

  && .carousel > .control-arrow::before {
    border-left-color: ${(props) => props.theme.fg};
    border-right-color: ${(props) => props.theme.fg};
  }

  .carousel > .slider-wrapper > .slider.animated > .slide {
    background-color: ${(props) => props.theme.bg};
    display: flex;
  }
`;
