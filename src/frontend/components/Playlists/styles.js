import styled from 'styled-components';

export const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const PlaylistButton = styled.div`
  background-color: gray;
  color: ${(props) => (props.selected ? 'red' : 'black')};
`;
