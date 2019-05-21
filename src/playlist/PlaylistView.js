import React, { useReducer, useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import * as api from '../api';

import PlaylistList from './PlaylistList';
import PlaylistCarousel from './PlaylistCarousel';

function newCommentsReducer (state, action) {
  switch(action.type) {
    case 'SET_COMMENTS': {
      return {
        ...state,
        canonical: action.comments ? { ...action.comments } : {},
        changes: action.comments ? { ...action.comments } : {},
      };
    }
    case 'SAVE_COMMENTS' : {
      // TODO this should talk to the backend
      return {
        ...state,
        canonical: {
          ...state.canonical,
          ...state.changes,
        },
      };
    }
    case 'UPDATE_CHANGES': {
      const { songId, change } = action;
      const newChange = change === null || change === undefined ? state.canonical[songId] : change;

      return {
        ...state,
        changes: {
          ...state.changes,
          [songId]: newChange,
        },
      };
    }
    default: {
      //
    }
  };
}


const PlaylistContainer = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
`;

// TODO write tests
function PlaylistView ({playlistId}) {
  const [playlist, setPlaylist] = useState();
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(false);

  const [comments, setComments] = useReducer(newCommentsReducer, { comments: {}, changes: {}});

  const onChangeComment = (songId, change) => {
    setComments({type: 'UPDATE_CHANGES', songId, change });
  };

  const onSaveComment = () => {
    setComments({type: 'SAVE_COMMENTS'});
  };
  const toggleShowCarousel = () => {
    setShowCarousel(!showCarousel);
  }

  const hasCommentChanged = (songId) => {
    return comments.changes[songId] !== comments.canonical[songId];
  };

  useEffect(() => {
    async function getPlaylist () {
      const [newPlaylist, comments] = await Promise.all([
        api.getPlaylist(playlistId),
        api.getComments(playlistId),
      ]);

      ReactDOM.unstable_batchedUpdates(() => {
        setPlaylist(newPlaylist);
        setComments({type: 'SET_COMMENTS', comments});
      });
    }

    getPlaylist();
  }, [playlistId]);

  return (
    playlist ? <PlaylistContainer>
      <h1>{playlist.name}</h1>
      <p>{playlist.description}</p>

      <Modal
        isOpen={showCarousel}
        onRequestClose={() => {
          toggleShowCarousel();
        }}
      >
        <PlaylistCarousel
          songs={playlist.songs}
          comments={comments.changes}
          onSaveSong={onSaveComment}
          onClickSong={(id) => {
            setSelectedSongId(id);
          }}
          onChangeComment={onChangeComment}
          hasCommentChanged={hasCommentChanged}
          selectedSongId={selectedSongId}
        />
      </Modal>

      <PlaylistList
        songs={playlist.songs}
        comments={comments.changes}
        onSaveSong={onSaveComment}
        onClickSong={(id) => {
          toggleShowCarousel();
          setSelectedSongId(id);
        }}
        onChangeComment={onChangeComment}
        hasCommentChanged={hasCommentChanged}
      />
    </PlaylistContainer> : 'Loading...'
  );
}

export default PlaylistView;
