import styled from 'styled-components';

export const CommentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 5px;
  border: black solid 3px;
  text-align: left;
  overflow-y: auto;
  & > p {
    margin-top: 0;
  }

  & > p:last-of-type {
    margin-bottom: 0;
  }
`;

export const CommentArea = styled.textarea`
  color: ${(props) => (props.disabled ? 'red' : 'blue')};
  flex: 1;
  resize: none;
  border: none;
`;
