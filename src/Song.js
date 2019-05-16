import React from 'react';
import styled from 'styled-components';

import Artists from './Artists';

const SongContainer = styled.div`
  /*  */
`;

//TODO add readonly capabilities
const Song = React.memo(({songId, name, artists, comment = '', hasChanged, onChangeComment, onClick}) => {
  console.log('DRAW', songId);

  // TODO handle e.target handling properly - dont want div onClick to interfere with links/text area etc
  const onClickSong = (e) => {
    if (onClick) {
      onClick(songId);
    } 
  };

  return (
    <SongContainer onClick={onClickSong}>
      <div>{name}</div>
      <Artists artists={artists} />
      <textarea type="text" value={comment} onChange={(e) => onChangeComment(songId, e.target.value)}/>
      { hasChanged && 'changed'}
    </SongContainer>
  );
});

export default Song;