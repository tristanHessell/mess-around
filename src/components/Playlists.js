import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  playlistsSelector,
  fetchPlaylists,
} from '../redux/modules/playlists';

// TODO play around with css animations
const PlaylistsContainer = styled.div`
  display: flex;
  /* position: relative; */
  flex-direction: column;
  width: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Playlists = React.memo(({ isOpen }) => {
  const { playlists, isLoading } = useSelector(playlistsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPlaylist () {
      await dispatch(fetchPlaylists());
    }

    getPlaylist();
  }, [dispatch]);

  return (
    <PlaylistsContainer isOpen={isOpen}>
      { !isLoading ?
        playlists.map((playlist) => (
          <Link key={playlist.id} to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
        ))
      : 'loading...'}
    </PlaylistsContainer>
  );
});

export default Playlists;