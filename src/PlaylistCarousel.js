import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

import Song from './Song';

const PlaylistCarouselContainer = styled.div`
  /*  */
`;

const PlaylistCarousel = React.memo(({songs, comments, onClickSong, onChangeComment, onClickUndo, onClickSave, onClickSaveAll, hasCommentChanged, selectedSongId, readOnly}) => {
  return (
    <PlaylistCarouselContainer>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        selectedItem={songs.findIndex((song) => song.id === selectedSongId)}
        onChange={(index) => onClickSong(songs[index].id)}
      >
        {songs.map((song) =>{
          const hasChanged = hasCommentChanged(song.id);

          return (
            <div key={song.id}>
              <Song
                songId={song.id}
                name={song.name}
                artists={song.artists}
                onChangeComment={onChangeComment}
                comment={comments[song.id]}
                hasChanged={hasChanged}
                onClick={() => onClickSong(song.id)}
                readOnly={readOnly}
                onUndo={onClickUndo}
                onSave={onClickSave}
              />

            </div>
          );
        })}
      </Carousel>
      {!readOnly && <button onClick={() => onClickSaveAll()}>Save All</button>}
    </PlaylistCarouselContainer>
  );
});

export default PlaylistCarousel;