import React, { useState } from 'react';
import { Router, Link } from '@reach/router';

import ModalRoot from './components/Modal';
import Playlists from './components/Playlists';
import ReadOnlyContext from './ReadOnlyContext';

import LandingPage from './pages/landing';
import PlaylistPage from './pages/playlist';

import {
  AppWrapper,
  HeadBarWrapper,
  ViewPortWrapper,
  SideBarWrapper,
  ViewWrapper,
} from './styles';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ReadOnlyContext.Provider value={false}>
      <ModalRoot />
      <AppWrapper>
        <HeadBarWrapper>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'IS OPEN' : ' ISCLOSE'}
          </button>
          <Link to="/">Home</Link>|
        </HeadBarWrapper>

        <ViewPortWrapper>
          <SideBarWrapper isOpen={isOpen}>
            <Playlists />
          </SideBarWrapper>
          <ViewWrapper isOpen={isOpen}>
            <Router>
              <LandingPage path="/" />
              <PlaylistPage path="/playlists/:playlistId" />
            </Router>
          </ViewWrapper>
        </ViewPortWrapper>
      </AppWrapper>
    </ReadOnlyContext.Provider>
  );
}

export default App;
