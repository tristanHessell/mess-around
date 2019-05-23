import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux'

import {
  fetchComments,
  storeComments,
  updateComments,
  commentsSelector, // TODO move all the redux stuff to their own places
  playlistSelector, // TODO move all the redux stuff to their own places
  fetchPlaylist,
} from './actions';

import PlaylistList from './playlist/PlaylistList';
import PlaylistCarousel from './playlist/PlaylistCarousel';
import User from './user/User'

const PlaylistContainer = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
`;

const user = {
  name: 'ALI BABA'
};

// TODO write tests
function PlaylistView ({playlistId}) {
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(false);

  const comments = useSelector(commentsSelector);
  const { canonical: playlist } = useSelector(playlistSelector);
  const dispatch = useDispatch();

  const onChangeComment = (songId, change) => {
    dispatch(updateComments(songId, change));
  };

  const onSaveComment = () => {
    dispatch(storeComments());
  };
  const toggleShowCarousel = () => {
    setShowCarousel(!showCarousel);
  }

  const hasCommentChanged = (songId) => {
    return comments.changes[songId] !== comments.canonical[songId];
  };

  useEffect(() => {
    async function getPlaylist () {
      await Promise.all([
        dispatch(fetchPlaylist(playlistId)),
        dispatch(fetchComments(playlistId)),
      ]);
    }

    getPlaylist();
  }, [playlistId, dispatch]);

  return (
    !playlist.isLoading && !comments.isLoading ? <PlaylistContainer>
      <div>
        <h1>{playlist.name}</h1>
        <p>{playlist.description}</p>
        Written by <User
          name={user.name}
        />
      </div>

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
