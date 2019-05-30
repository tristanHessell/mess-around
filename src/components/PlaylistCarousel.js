import React, {useContext} from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

import ReadOnlyContext from '../ReadOnlyContext';
import Song from './Song';

import './playlistCarousel.css';

const PlaylistCarouselContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PlaylistCarousel = React.memo(({songs, onClickSong, onChangeComment, onSaveSong, getComment, selectedSongId}) => {
  const readOnly = useContext(ReadOnlyContext);
  const selectedItem = songs.findIndex((song) => song.id === selectedSongId);

  return (
    <PlaylistCarouselContainer>
      <Carousel
        className="playlist-carousel"
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        selectedItem={selectedItem === -1 ? 0 : selectedItem}
        onChange={(index) => onClickSong(songs[index].id)}
      >
        {songs.map((song) =>{
          const { comment, hasChanged } = getComment(song.id);

          return (
            <Song
              key={song.id}
              songId={song.id}
              name={song.name}
              artists={song.artists}
              onChangeComment={onChangeComment}
              comment={comment}
              hasChanged={hasChanged}
              onClick={() => onClickSong(song.id)}
              readOnly={readOnly}
              onSave={onSaveSong}
              expanded
            />
          );
        })}
      </Carousel>
      {!readOnly && <button onClick={() => onSaveSong()}>Save All</button>}
    </PlaylistCarouselContainer>
  );
});

export default PlaylistCarousel;