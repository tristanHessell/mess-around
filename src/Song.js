import React, {useContext} from 'react';
import styled from 'styled-components';

import ReadOnlyContext from './ReadOnlyContext';
import Artists from './Artists';

const SongContainer = styled.div`
  /*  */
`;

const CommentArea = styled.textarea`
  color: ${(props) => props.disabled ? 'red': 'blue'};
`;
const Song = React.memo(({songId, name, artists, comment = '', hasChanged, onChangeComment, onClick, onSave, }) => {
  const readOnly = useContext(ReadOnlyContext)

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
      {hasChanged && <button onClick={() => onChangeComment(songId)}>Undo</button>}
    </SongContainer>
  );
});

export default Song;