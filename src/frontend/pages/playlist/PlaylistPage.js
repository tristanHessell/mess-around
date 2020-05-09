import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchComments,
  saveComments,
  updateComment,
} from '../../redux/comments/actions';

import {
  commentsSelector,
  commentChangesSelector,
} from '../../redux/comments/selectors';

// import Modal from '../../components/Modal';
import { fetchPlaylist } from '../../redux/playlist/actions';
import { playlistSelector } from '../../redux/playlist/selectors';
import { showModal, hideModal } from '../../redux/modal/actions';

import PlaylistList from '../../components/PlaylistList';
import PlaylistCarousel from '../../components/PlaylistCarousel';
import User from '../../components/User/User';

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const user = {
  name: 'ALI BABA',
};

const modes = {
  CAROUSEL: 'CAROUSEL',
  LIST: 'LIST',
};

const PlaylistPage = React.memo(({ playlistId }) => {
  const [mode, setMode] = useState(modes.LIST);
  const [selectedSongId, setSelectedSongId] = useState();

  const comments = useSelector(commentsSelector);
  const playlist = useSelector(playlistSelector);
  const getComment = useSelector(commentChangesSelector);
  const dispatch = useDispatch();

  const onChangeComment = (songId, change) => {
    dispatch(updateComment(songId, change));
  };

  const onSaveComment = async () => {
    dispatch(
      showModal({
        modalType: 'SAVING_MODAL',
        modalProps: {
          message: 'Saving Now',
        },
      }),
    );

    await dispatch(saveComments(playlistId));

    dispatch(hideModal());
  };

  useEffect(() => {
    async function getPlaylist() {
      await dispatch(
        showModal({
          modalType: 'LOADING_MODAL',
        }),
      );
      await Promise.all([
        dispatch(fetchPlaylist(playlistId)),
        dispatch(fetchComments(playlistId)),
      ]);
      await dispatch(
        hideModal({
          modalType: 'LOADING_MODAL',
        }),
      );
    }

    getPlaylist();
  }, [playlistId, dispatch]);

  if (!playlist || !playlist.canonical || playlist.isLoading) {
    return null;
  }

  return (
    <PlaylistContainer>
      <div>
        <h1>{playlist.canonical.name}</h1>
        <p>{playlist.canonical.description}</p>
        Written by <User name={user.name} />
        <input
          data-test="list-mode"
          type="radio"
          name="mode"
          checked={mode === modes.LIST}
          onChange={() => setMode(modes.LIST)}
        />
        List
        <input
          data-test="carousel-mode"
          type="radio"
          name="mode"
          checked={mode === modes.CAROUSEL}
          onChange={() => setMode(modes.CAROUSEL)}
        />
        Carousel
      </div>

      {!comments.loading && (
        <>
          {mode === modes.CAROUSEL && (
            <PlaylistCarousel
              songs={playlist.canonical.songs}
              getComment={getComment}
              onSaveSong={onSaveComment}
              onClickSong={(id) => {
                setSelectedSongId(id);
              }}
              onChangeComment={onChangeComment}
              selectedSongId={selectedSongId}
            />
          )}
          {mode === modes.LIST && (
            <PlaylistList
              songs={playlist.canonical.songs}
              comments={comments}
              getComment={getComment}
              onSaveSong={onSaveComment}
              onClickSong={(id) => {
                setSelectedSongId(id);
              }}
              onChangeComment={onChangeComment}
            />
          )}
        </>
      )}
    </PlaylistContainer>
  );
});

PlaylistPage.displayName = 'PlaylistPage';

export default PlaylistPage;
