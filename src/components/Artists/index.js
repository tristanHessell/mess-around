import React from 'react';
import styled from 'styled-components';

const ArtistContainer = styled.div`
  /*  */
`;

const Artists = React.memo(({artists}) => {
  return (
    <ArtistContainer>
      {artists.map((artist, index) => (
        <span key={`${artist.id}-${artist.name}`}>
          <span>{artist.name}</span>
          {index !== artists.length -1  && <span>|</span>}
        </span>
      ))}
    </ArtistContainer>
  );
});

export default Artists;
