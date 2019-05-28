import React, {useContext} from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import ReadOnlyContext from '../ReadOnlyContext';

const CommentContainer = styled.div`
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

const CommentArea = styled.textarea`
  color: ${(props) => props.disabled ? 'red': 'blue'};
  flex: 1;
  resize: none;
  border: none;
`;

// TODO make preview mode toggle when you double click on the preview
const Comment = React.memo(({comment, onChange, preview}) => {
  const readOnly = useContext(ReadOnlyContext);

  return (
    <CommentContainer>
      { preview ?
        <ReactMarkdown
          source={comment}
        /> :
        <CommentArea
          value={comment}
          onChange={(e) => onChange(e.target.value)}
          disabled={readOnly}
        />
      }
    </CommentContainer>
  );
});

export default Comment;
