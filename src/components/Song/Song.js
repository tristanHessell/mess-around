import React from 'react';

import Artists from '../Artists';
import Comment from '../Comment';
import { SongContainer } from './styles';

const Song = React.memo(
  ({
    songId,
    name,
    artists,
    comment = '',
    hasChanged,
    onChangeComment,
    onClick,
    preview,
  }) => {
    const onClickSong = (/*e*/) => {
      // if (e.target.type !== 'textarea' && e.target.type !== 'a') {
      onClick && onClick(songId);
      // }
    };

    return (
      <SongContainer onDoubleClick={onClickSong}>
        <div>
          <div>{name}</div>
          <Artists artists={artists} />
          {hasChanged && 'changed'}
          {hasChanged && (
            <button onClick={() => onChangeComment(songId)}>Undo</button>
          )}
        </div>
        <Comment
          comment={comment}
          onChange={(comment) => onChangeComment(songId, comment)}
          preview={preview}
        />
      </SongContainer>
    );
  },
);

export default Song;
