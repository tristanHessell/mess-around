import React from 'react';

import { ArtistContainer } from './styles';

const Artists = React.memo(({artists}) => {
  if (!artists) {
    return null;
  }

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
