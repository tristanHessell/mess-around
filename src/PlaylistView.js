import React, { useReducer, useCallback, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

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

// TODO write tests
function Playlist({name, description, comments, songs, onSaveComments}) {
  // TODO changes is a shit name
  const [changes, setChanges] = useReducer(reducer, comments);
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(false);
  const onChangeComment = useCallback((songId, comment) => setChanges({type: 'CHANGE', songId, comment}), [setChanges]);

  const onClickUndo = (songId) => onChangeComment(songId, comments[songId]);
  const onClickSaveAll = () => onSaveComments(changes);
  const onClickSave = (songId) => onSaveComments({[songId]: changes[songId]});

  const toggleShowCarousel = () => {
    setShowCarousel(!showCarousel);
  }

  const hasCommentChanged = (songId) => {
    const change = changes[songId];
    const comment = comments[songId];

    if (!change && !comment) {
      return false;
    }
  
    return change !== comment;
  };

  return (
    <PlaylistContainer>
      <h1>{name}</h1>
      <p>{description}</p>

      <Modal
        isOpen={showCarousel}
        onRequestClose={() => {
          toggleShowCarousel();
        }}
      >
        <PlaylistCarousel
          songs={songs}
          comments={changes}
          onClickUndo={onClickUndo}
          onClickSaveAll={onClickSaveAll}
          onClickSave={onClickSave}
          onClickSong={(id) => {
            setSelectedSongId(id);
          }}
          onChangeComment={onChangeComment}
          hasCommentChanged={hasCommentChanged}
          selectedSongId={selectedSongId}
        />
      </Modal>

      <PlaylistList
        songs={songs}
        comments={changes}
        onClickUndo={onClickUndo}
        onClickSaveAll={onClickSaveAll}
        onClickSave={onClickSave}
        onClickSong={(id) => {
          toggleShowCarousel();
          setSelectedSongId(id);
        }}
        onChangeComment={onChangeComment}
        hasCommentChanged={hasCommentChanged}
      />
    </PlaylistContainer>
  );
}

export default Playlist;
