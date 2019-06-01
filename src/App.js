import React, { useState } from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';

import ReadOnlyContext from './ReadOnlyContext';
import PlaylistView from './PlaylistView';
import Playlists from './components/Playlists';

const AppContainer = styled.div`
  display:flex;
  flex-direction: column;
  height:100%;
`;

// shit naming
const ViewPortContainer = styled.div`
  height:100%;
  overflow: hidden;
`;

const SideBarContainer = styled.div`
  display:flex;
  flex-direction: row;
  position: fixed;
  height:100%;
  width: 200px;
  transform: ${(props) => !props.isOpen && 'translateX(-200px)'};
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
`;

// shit naming
const ViewContainer = styled.div`
  height:100%;
  transform: ${(props) => props.isOpen && 'translateX(200px)'};
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
`;

function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <ReadOnlyContext.Provider value={false}>
      <AppContainer>
        {/* TODO make this a top bar of some sort */}
        <div> 
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'IS OPEN' : ' ISCLOSE'}</button>
          <Link to="/">Home</Link> |
        </div>
        <ViewPortContainer>
          <SideBarContainer isOpen={isOpen}>
            <Playlists/>
          </SideBarContainer>
          <ViewContainer isOpen={isOpen}>
            <Route path="/playlists/:id" render={({match}) => (
                <PlaylistView
                  playlistId={match.params.id}
                />
              )}
            />
          </ViewContainer>
        </ViewPortContainer>
      </AppContainer>
    </ReadOnlyContext.Provider>
  );
}

export default App;
