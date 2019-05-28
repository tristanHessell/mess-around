import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux'

import {
  commentsSelector,
  commentChangesSelector, // TODO rename
  fetchComments,
  storeComments,
  updateComments,
} from './redux/modules/comments';

import {
  playlistSelector,
  fetchPlaylist,
} from './redux/modules/playlist';

import PlaylistList from './components/PlaylistList';
import PlaylistCarousel from './components/PlaylistCarousel';
import User from './components/User'

const PlaylistContainer = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
  flex: 1;
`;

const user = {
  name: 'ALI BABA'
};

// TODO write tests
function PlaylistView ({playlistId}) {
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(false);

  const comments = useSelector(commentsSelector);
  const { canonical: playlist, isLoading: playlistIsLoading } = useSelector(playlistSelector);
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

  const getComment = commentChangesSelector(comments);

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
    !playlistIsLoading && !comments.isLoading ? <PlaylistContainer>
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
          getComment={getComment}
          onSaveSong={onSaveComment}
          onClickSong={(id) => {
            setSelectedSongId(id);
          }}
          onChangeComment={onChangeComment}
          selectedSongId={selectedSongId}
        />
      </Modal>

      <PlaylistList
        songs={playlist.songs}
        getComment={getComment}
        onSaveSong={onSaveComment}
        onClickSong={(id) => {
          toggleShowCarousel();
          setSelectedSongId(id);
        }}
        onChangeComment={onChangeComment}
      />
    </PlaylistContainer> : 'Loading...'
  );
}

export default PlaylistView;
