import React, { useContext } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import styled from 'styled-components';

import ReadOnlyContext from '../ReadOnlyContext';
import Song from './Song';

const PlaylistContainer = styled.div`
  display:flex;
  flex-direction: column;
  flex: 1;
`;

// https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md#can-i-use-autosizer-within-a-flex-container
const AutoSizerContainer = styled.div`
  flex: 1 1 auto;
`;

function PlaylistList({comments, songs, onSaveSong, onClickSong, onChangeComment, hasCommentChanged}) {
  const readOnly = useContext(ReadOnlyContext);

  function rowRenderer ({index, style}) {
    const song = songs[index];
    const hasChanged = hasCommentChanged(song.id);

    return (
      <div key={song.id} style={style}>
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
  }

  return (
    <PlaylistContainer>
      <AutoSizerContainer>
        <AutoSizer>
          {({width, height}) => (
            <List
              width={width}
              height={height}
              rowCount={songs.length}
              rowHeight={100} // TODO change this
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      </AutoSizerContainer>
      {!readOnly && <button onClick={() => onSaveSong()}>Save All</button>}
    </PlaylistContainer>
  );
}

export default PlaylistList;
