import React from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

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
    <Router>
      <ReadOnlyContext.Provider value={false}>
        <AppContainer>
          <div>
            <Link to="/">Home</Link> | <Link to={`/playlists/${id}`}>Playlist</Link>
          </div>
          <AppContainer>
            <Route path="/playlists/:id" render={({match}) => (
              <PlaylistView
                playlistId={match.id}
              />
            )}
          />
          </AppContainer>
        </AppContainer>
      </ReadOnlyContext.Provider>
    </Router>
  );
}

export default App;
