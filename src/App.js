import React from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';

import ReadOnlyContext from './ReadOnlyContext';

import PlaylistView from './PlaylistView';

const AppContainer = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
`;

// TODO connect to spotify
// TODO connect to a DB
// TODO landing page
// TODO list of playlists
function App() {
  const id = 'BLAH'
  return (
    <AppContainer>
      <ReadOnlyContext.Provider value={false}>
        <div>
          <Link to="/">Home</Link> | <Link to={`/playlist/${id}`}>Playlist</Link>
        </div>
        <AppContainer>
          <Route path="/playlist/:id" render={({match}) => (
            <PlaylistView
              playlistId={match.id}
            />
          )}
        />
        </AppContainer>
      </ReadOnlyContext.Provider>
    </AppContainer>
  );
}

export default App;
