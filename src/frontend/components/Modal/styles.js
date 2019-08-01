import StyledReactModal from 'styled-react-modal';

export const StyledModal = StyledReactModal.styled`
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fg};
  height: 80%;
  width: 80%;
  border: solid 3px;
  border-color: ${(props) => props.theme.fg};
`;
