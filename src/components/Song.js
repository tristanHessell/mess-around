import React, {useContext} from 'react';
import styled from 'styled-components';

import ReadOnlyContext from '../ReadOnlyContext';
import Artists from './Artists';
import Comment from './Comment';

const SongContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Song = React.memo(({songId, name, artists, comment = '', hasChanged, onChangeComment, onClick, preview}) => {
  const readOnly = useContext(ReadOnlyContext);

  // TODO add comments explaining the hackery
  const onClickSong = (e) => {
    if (e.target.type !== 'textarea' && e.target.type !== 'a' && onClick) {
      onClick(songId);
    }
  };

  return (
    <SongContainer onDoubleClick={onClickSong}>
      <div>
        <div>{name}</div>
        <Artists artists={artists} />
        {!readOnly && hasChanged && 'changed'}
        {hasChanged && <button onClick={() => onChangeComment(songId)}>Undo</button>}
      </div>
      <Comment comment={comment} onChange={(comment) => onChangeComment(songId, comment)} disabled={readOnly} preview={preview}/>
    </SongContainer>
  );
});

export default Song;