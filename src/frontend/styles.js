import styled from 'styled-components';

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// shit naming
export const ViewPortWrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;

export const HeadBarWrapper = styled.div`
  /*  */
`;

export const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  height: 100%;
  width: 200px;
  transform: ${(props) => !props.isOpen && 'translateX(-200px)'};
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
`;

// shit naming
export const ViewWrapper = styled.div`
  height: 100%;
  transform: ${(props) => props.isOpen && 'translateX(200px)'};
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;

  /* https://github.com/reach/router/issues/63 */
  div[role='group'][tabindex] {
    height: 100%;
  }
`;
