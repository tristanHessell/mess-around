import React from 'react';
import { List, AutoSizer } from 'react-virtualized';
import styled from 'styled-components';

import Song from './Song';

const PlaylistContainer = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
`;

// https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md#can-i-use-autosizer-within-a-flex-container
const AutoSizerContainer = styled.div`
  flex: 1 1 auto;
`;

function PlaylistList({comments, songs, onClickSave, onClickSaveAll, onClickSong, onChangeComment, onClickUndo, hasCommentChanged, readOnly}) {

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
          onUndo={onClickUndo}
          onSave={onClickSave}
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
      {!readOnly && <button onClick={() => onClickSaveAll()}>Save All</button>}
    </PlaylistContainer>
  );
}

export default PlaylistList;
