import React from 'react';
import styled from 'styled-components';

import Artists from './Artists';

const SongContainer = styled.div`
  /*  */
`;

const CommentArea = styled.textarea`
  color: ${(props) => props.disabled ? 'red': 'blue'};
`;
const Song = React.memo(({songId, name, artists, comment = '', hasChanged, onChangeComment, onClick, onUndo, onSave, readOnly}) => {
  console.log('DRAW', songId);

  const onClickSong = (e) => {
    if (onClick) {
      onClick(songId);
    } 
  };

  return (
    <SongContainer onDoubleClick={onClickSong}>
      <div>{name}</div>
      <Artists artists={artists} />
      <CommentArea value={comment} onChange={(e) => onChangeComment(songId, e.target.value)} disabled={readOnly}/>
      {!readOnly && hasChanged && 'changed'}
      {hasChanged && <button onClick={() => onUndo(songId)}>Undo</button>}
      {hasChanged && <button onClick={() => onSave(songId)}>Save</button>}
    </SongContainer>
  );
});

export default Song;