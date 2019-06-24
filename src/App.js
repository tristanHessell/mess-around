import React, { useState } from 'react';
import styled from 'styled-components';
import { Router, Link } from '@reach/router';

import ModalRoot from './components/Modal';
import ReadOnlyContext from './ReadOnlyContext';
import Playlists from './components/Playlists';

import LandingPage from './pages/landing';
import PlaylistPage from './pages/playlist';

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

const HeadBarContainer = styled.div`
  /*  */
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

  /* https://github.com/reach/router/issues/63 */
  div[role="group"][tabindex] {
    height:100%;
  }
`;

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ReadOnlyContext.Provider value={false}>
      <ModalRoot />
      <AppContainer>
        <HeadBarContainer> 
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'IS OPEN' : ' ISCLOSE'}</button>
          <Link to="/">Home</Link>|
        </HeadBarContainer>

        <ViewPortContainer>
          <SideBarContainer isOpen={isOpen}>
            <Playlists/>
          </SideBarContainer>
          <ViewContainer isOpen={isOpen}>
            <Router>
              <LandingPage path="/" />
              <PlaylistPage path="/playlists/:playlistId"/>
            </Router>
          </ViewContainer>
        </ViewPortContainer>
      </AppContainer>
    </ReadOnlyContext.Provider>
  );
}

export default App;
