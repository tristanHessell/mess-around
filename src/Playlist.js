import React, {useReducer, useCallback } from 'react';

import Song from './Song';

function reducer(state, {type, songId, comment}) {
  return {
    ...state,
    [songId]: comment
  }
}

function hasCommentChanged (comment, change) {
  if (!change && !comment) {
    return false;
  }

  return change !== comment;
};

// TODO use a virtualised list
// TODO make it pop out (with the song & comment in a modal, with the comment filling the screen as possible) on hold/double click?
// TODO write tests
function Playlist({id, name, description, comments, songs, onSaveComments}) {
  const [changes, setChanges] = useReducer(reducer, comments);
  const onChangeComment = useCallback((songId, comment) => setChanges({type: 'CHANGE', songId, comment}), [setChanges]);

  const onClickUndo = (songId, comment) => (/*e*/) => onChangeComment(songId, comment);
  const onClickSave = (/*e*/) => onSaveComments({changes});

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      {songs.map((song) => {
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
            />
            {hasChanged && <button onClick={onClickUndo(song.id, comments[song.id])}>Undo</button>}
          </div>
        );
        })}
      <button onClick={onClickSave}>Save</button>
    </div>
  );
}

export default Playlist;
