import React, { useReducer, useCallback, useState } from 'react';
import styled from 'styled-components';

import PlaylistList from './PlaylistList';
import PlaylistCarousel from './PlaylistCarousel';

function reducer(state, {type, songId, comment}) {
  return {
    ...state,
    [songId]: comment
  };
}

const PlaylistContainer = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
`;

// TODO fix up state and duplication in playlist area
// TODO make it pop out (with the song & comment in a modal, with the comment filling the screen as possible) on hold/double click?
// TODO write tests
function Playlist({id, name, description, comments, songs, onSaveComments}) {
  const [changes, setChanges] = useReducer(reducer, comments);
  const [viewToggle, setView] = useState('list');
  const onChangeComment = useCallback((songId, comment) => setChanges({type: 'CHANGE', songId, comment}), [setChanges]);

  const onClickUndo = (songId, comment) => onChangeComment(songId, comment);
  const onClickSave = () => onSaveComments({changes});
  const onClickSong = (id) => console.log('clicked', id);

  return (
    <PlaylistContainer>
      <h1>{name}</h1>
      <p>{description}</p>

      <button onClick={() => setView(viewToggle === 'caro' ? 'list' : 'caro')}>Toggle View Type</button>

      {viewToggle === 'caro' && <PlaylistCarousel
        songs={songs}
        comments={comments}
        changes={changes}
        onClickUndo={onClickUndo}
        onClickSave={onClickSave}
        onClickSong={onClickSong}
        onChangeComment={onChangeComment}
      />}

      {viewToggle === 'list' && <PlaylistList
        songs={songs}
        comments={comments}
        changes={changes}
        onClickUndo={onClickUndo}
        onClickSave={onClickSave}
        onClickSong={onClickSong}
        onChangeComment={onChangeComment}
      />}
    </PlaylistContainer>
  );
}

export default Playlist;
