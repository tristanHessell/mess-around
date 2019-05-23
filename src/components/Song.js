import React, {useContext, useRef} from 'react';
import styled from 'styled-components';

import ReadOnlyContext from '../ReadOnlyContext';
import Artists from './Artists';

const SongContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const CommentArea = styled.textarea`
  color: ${(props) => props.disabled ? 'red': 'blue'};
  flex: 1;
  resize: none;
`;
const Song = React.memo(({songId, name, artists, comment = '', hasChanged, onChangeComment, onClick, expanded}) => {
  const readOnly = useContext(ReadOnlyContext);
  const songContainerRef = useRef(null);

  const onClickSong = (e) => {
    if (e.target.type !== 'textarea' && e.target.type !== 'a' && onClick) {
      onClick(songId);
    }
  };

  return (
    <SongContainer onDoubleClick={onClickSong} ref={songContainerRef}>
      <div>
        <div>{name}</div>
        <Artists artists={artists} />
        {!readOnly && hasChanged && 'changed'}
        {hasChanged && <button onClick={() => onChangeComment(songId)}>Undo</button>}
      </div>
      <CommentArea value={comment} onChange={(e) => onChangeComment(songId, e.target.value)} disabled={readOnly} expanded={expanded}/>
    </SongContainer>
  );
});

export default Song;