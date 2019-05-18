import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import * as api from './api';
import PlaylistView from './PlaylistView';

const AppContainer = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
`;

// TODO add react-router


// TODO connect to spotify
// TODO connect to a DB
// TODO landing page
// TODO list of playlists
function App() {
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

  return (
    <AppContainer>
      {playlist && <PlaylistView
        playlistId={playlist.id}
        name={playlist.name}
        description={playlist.description}
        comments={comments}
        songs={playlist.songs}
        onSaveComments={onClickSaveComments}
      />}
    </AppContainer>
  );
}

export default App;
