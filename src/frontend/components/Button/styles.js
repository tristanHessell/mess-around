import styled from 'styled-components';

export const StyledButton = styled.button`
  color: ${(props) => props.theme.fg};
  background-color: ${(props) => props.theme.bg};
`;
