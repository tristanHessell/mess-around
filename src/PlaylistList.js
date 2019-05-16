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

function hasCommentChanged (comment, change) {
  if (!change && !comment) {
    return false;
  }

  return change !== comment;
};

// TODO make it pop out (with the song & comment in a modal, with the comment filling the screen as possible) on hold/double click?
// TODO write tests
function PlaylistList({comments, changes, songs, onClickSave, onClickSong, onChangeComment, onClickUndo}) {

  function rowRenderer ({index, style}) {
    const song = songs[index];
    const hasChanged = hasCommentChanged(comments[song.id], changes[song.id]);

    return (
      <div key={song.id} style={style}>
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
              rowHeight={75} // TODO change this
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      </AutoSizerContainer>
      <button onClick={() => onClickSave()}>Save</button>
    </PlaylistContainer>
  );
}

export default PlaylistList;
