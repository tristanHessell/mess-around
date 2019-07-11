import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
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

import { fetchPlaylist } from '../../redux/playlist/actions';

import { playlistSelector } from '../../redux/playlist/selectors';

import { showModal, hideModal } from '../../redux/modal/actions';

import LoadingModal from '../../components/LoadingModal';

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

function PlaylistPage({ playlistId }) {
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(false);

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

    await dispatch(saveComments());

    dispatch(hideModal());
  };
  const toggleShowCarousel = () => {
    setShowCarousel(!showCarousel);
  };

  useEffect(() => {
    async function getPlaylist() {
      await Promise.all([
        dispatch(fetchPlaylist(playlistId)),
        dispatch(fetchComments(playlistId)),
      ]);
    }

    getPlaylist();
  }, [playlistId, dispatch]);

  return !playlist.isLoading ? (
    <PlaylistContainer>
      <div>
        <h1>{playlist.canonical.name}</h1>
        <p>{playlist.canonical.description}</p>
        Written by <User name={user.name} />
      </div>

      {!comments.loading && (
        <>
          <Modal
            isOpen={showCarousel}
            onRequestClose={() => {
              toggleShowCarousel();
            }}
          >
            <PlaylistCarousel
              songs={playlist.canonical.songs}
              comments={comments}
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
            songs={playlist.canonical.songs}
            comments={comments}
            getComment={getComment}
            onSaveSong={onSaveComment}
            onClickSong={(id) => {
              toggleShowCarousel();
              setSelectedSongId(id);
            }}
            onChangeComment={onChangeComment}
          />
        </>
      )}
    </PlaylistContainer>
  ) : (
    <LoadingModal />
  );
}

export default PlaylistPage;
