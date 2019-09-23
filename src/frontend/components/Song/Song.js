import React from 'react';

import Artists from '../Artists';
import Comment from '../Comment';
import Button from '../Button';
import { SongContainer } from './styles';

const Song = React.memo(
  ({ song, comment = '', hasChanged, onChangeComment, onClick }) => {
    const { id, name, artists } = song;
    const onClickSong = (/*e*/) => {
      // if (e.target.type !== 'textarea' && e.target.type !== 'a') {
      onClick && onClick(id);
      // }
    };

    return (
      <SongContainer onDoubleClick={onClickSong}>
        <div>
          <div>{name}</div>
          <Artists artists={artists} />
          {hasChanged && 'changed'}
          {hasChanged && (
            <Button onClick={() => onChangeComment(id)}>Undo</Button>
          )}
        </div>
        <Comment
          comment={comment}
          onChange={(comment) => onChangeComment(id, comment)}
        />
      </SongContainer>
    );
  },
);

Song.displayName = 'Song';

export default Song;
