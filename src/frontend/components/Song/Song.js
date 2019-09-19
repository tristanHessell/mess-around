import React from 'react';

import Artists from '../Artists';
import Comment from '../Comment';
import Button from './components/Button';
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
            <Button onClick={() => onChangeComment(songId)}>Undo</Button>
          )}
        </div>
        <Comment
          comment={comment}
          onChange={(comment) => onChangeComment(songId, comment)}
        />
      </SongContainer>
    );
  },
);

Song.displayName = 'Song';

export default Song;
