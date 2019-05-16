import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

import Song from './Song';

const PlaylistCarouselContainer = styled.div`
  /*  */
`;

function hasCommentChanged (comment, change) {
  if (!change && !comment) {
    return false;
  }

  return change !== comment;
};

const PlaylistCarousel = React.memo(({songs, comments, changes, onClickSong, onChangeComment, onClickUndo, onClickSave}) => {
  return (
    <PlaylistCarouselContainer>
      <Carousel showThumbs={false} showStatus={false} showIndicators={false}>
        {songs.map((song) =>{
          const hasChanged = hasCommentChanged(comments[song.id], changes[song.id]);

          return (
            <div key={song.id}>
              <Song
                songId={song.id}
                name={song.name}
                artists={song.artists}
                onChangeComment={onChangeComment}
                comment={changes[song.id]}
                hasChanged={hasChanged}
                onClick={() => onClickSong(song.id)}
              />
              {hasChanged && <button onClick={() => onClickUndo(song.id, comments[song.id])}>Undo</button>}
            </div>
          );
        })}
      </Carousel>
      <button onClick={() => onClickSave()}>Save</button>
    </PlaylistCarouselContainer>
  );
});

export default PlaylistCarousel;