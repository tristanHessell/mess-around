import React, { useReducer, useCallback, useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import * as api from './api';

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
//TODO move playlist stuff from App.js to here
function Playlist({playlistId}) {
  const [playlist, setPlaylist] = useState();
  const [comments, setComments] = useState();

  const onClickSaveComments = (changes) => {
    setComments({
      ...comments,
      ...changes,
    });
  };

  useEffect(() => {
    async function getPlaylist () {
      const [newPlaylist, newComments] = await Promise.all([api.getPlaylist(), api.getComments()]);
      ReactDOM.unstable_batchedUpdates(() => {
        setPlaylist(newPlaylist);
        setComments(newComments || {});
      });
    }

    getPlaylist();

  }, []);
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
