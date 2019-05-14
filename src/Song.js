import React from 'react';
import styled from 'styled-components';

const SongContainer = styled.div`
  /*  */
`;
const Song = React.memo(({songId, name, artists, comment = '', hasChanged, onChangeComment}) => {
  console.log('DRAW', songId)
  return (
    <SongContainer>
      <div>{name}</div>
      {/* TODO create an artist component */}
      <div>
        {artists.map((artist) => <span key={`${name}-${artist}`}>{artist}</span>)}
      </div>
      {/* TODO change to text area */}
      <input type="text" value={comment} onChange={(e) => onChangeComment(songId, e.target.value)}/>
      { hasChanged && 'changed'}
    </SongContainer>
  );
},
//  (prev, next) => {
//   console.log(next.songId, prev.onChangeComment === next.onChangeComment);
//   return false;
// }
);

export default Song;