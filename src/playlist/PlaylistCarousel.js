import React, {useContext} from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

import ReadOnlyContext from '../ReadOnlyContext';
import Song from '../song/Song';

const PlaylistCarouselContainer = styled.div`
  /*  */
`;

const PlaylistCarousel = React.memo(({songs, comments, onClickSong, onChangeComment, onSaveSong, hasCommentChanged, selectedSongId}) => {
  const readOnly = useContext(ReadOnlyContext);

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
                onSave={onSaveSong}
              />

            </div>
          );
        })}
      </Carousel>
      {!readOnly && <button onClick={() => onSaveSong()}>Save All</button>}
    </PlaylistCarouselContainer>
  );
});

export default PlaylistCarousel;