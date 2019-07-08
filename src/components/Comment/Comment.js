import React, { useContext, useState} from 'react';
import ReactMarkdown from 'react-markdown';

import ReadOnlyContext from '../../ReadOnlyContext';
import {
  CommentArea,
  CommentContainer
} from './styles';

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
