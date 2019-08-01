import React, { useState } from 'react';
import { Router, Link } from '@reach/router';
import { Provider } from 'react-redux';
import { ModalProvider } from 'styled-react-modal';

import { ThemeProvider } from 'styled-components';

import configureStore from './redux/store';

import ModalRoot from './components/ModalRoot';
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

const store = configureStore();

const darkTheme = {
  fg: 'white',
  bg: 'black',
};

const lightTheme = {
  fg: 'black',
  bg: 'white',
};

const defaultTheme = {
  name: 'light',
  ...lightTheme,
};

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    const name = theme.name === 'dark' ? 'light' : 'dark';
    const newTheme = name === 'light' ? lightTheme : darkTheme;

    setTheme({
      name,
      ...newTheme,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <Provider store={store}>
          <ReadOnlyContext.Provider value={false}>
            <ModalRoot />
            <AppWrapper id="app">
              <HeadBarWrapper>
                <button onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? 'IS OPEN' : ' ISCLOSE'}
                </button>
                <Link to="/">Home</Link>|
                <button onClick={() => toggleTheme()}> TOGGLE THEME</button>
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
        </Provider>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
