import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import {
  playlistsSelector,
  fetchPlaylists,
} from '../redux/modules/playlists';

const PlaylistsContainer = styled.div`
  color: ${(props) => props.isOpen ? 'red' : 'blue' };
`;

const Playlists = React.memo(({}) => {
  const { playlists, isLoading } = useSelector(playlistsSelector);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    async function getPlaylist () {
      await dispatch(fetchPlaylists());
    }

    getPlaylist();
  }, [dispatch]);

  return (
    <PlaylistsContainer isOpen={isOpen}>
      <button onClick={() => setIsOpen(!isOpen)}>OPEN/CLOSE</button>
      { !isLoading ? <div>
        {JSON.stringify(playlists)}
      </div> : 'loading...'}
    </PlaylistsContainer>
  );
});

export default Playlists;