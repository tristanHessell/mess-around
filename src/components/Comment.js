import React, { useContext, useState} from 'react';
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

const Comment = React.memo(({comment, onChange}) => {
  const readOnly = useContext(ReadOnlyContext);
  const [isEditable, setEditable] = useState(false);

  const onClickContainer = () => {
    !isEditable && setEditable(true);
  };

  const onChangeComment = (e) => {
    onChange && onChange(e.target.value);
  };

  const onBlurCommentBox = () => {
    setEditable(false);
  };

  return (
    <CommentContainer onClick={onClickContainer}>
      { !isEditable ?
        <ReactMarkdown
          source={comment}
        /> :
        <CommentArea
          autoFocus
          value={comment}
          onChange={onChangeComment}
          onBlur={onBlurCommentBox}
          disabled={readOnly}
        />
      }
    </CommentContainer>
  );
});

export default Comment;
