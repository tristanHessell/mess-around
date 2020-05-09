import React, { useContext } from 'react';

import ReadOnlyContext from '../../ReadOnlyContext';
import Song from '../Song';
import Carousel from '../Carousel';

import { PlaylistCarouselWrapper } from './styles';

const PlaylistCarousel = React.memo(
  ({
    songs,
    onClickSong,
    onChangeComment,
    onSaveSong,
    getComment,
    selectedSongId,
  }) => {
    const readOnly = useContext(ReadOnlyContext);
    const selectedIndex = songs.findIndex((song) => song.id === selectedSongId);

    return (
      <PlaylistCarouselWrapper>
        <Carousel
          selectedIndex={selectedIndex === -1 ? 0 : selectedIndex}
          onChange={(index) => {
            console.log(songs, index);
            onClickSong(songs[index].id);
          }}
        >
          {songs.map((song) => {
            const { comment, hasChanged } = getComment(song.id);

            return (
              <Song
                key={song.id}
                song={song}
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
      </PlaylistCarouselWrapper>
    );
  },
);

PlaylistCarousel.displayName = 'PlaylistCarousel';

export default PlaylistCarousel;
