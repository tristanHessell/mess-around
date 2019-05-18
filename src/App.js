import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';

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
  const id = 'BLAH'
  return (
    <AppContainer>
      <div>
        <Link to="/test">Test</Link> | <Link to={`"/playlist/${id}`}>Playlist</Link>
      </div>
      <AppContainer>
        {/* TODO get ID from playlist */}
        <Route path="/playlist/:id" render={({match}) => (
          <PlaylistView
            playlistId={match.id}
          />
        )}
      />
      </AppContainer>
    </AppContainer>
  );
}

export default App;
