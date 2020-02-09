/* eslint-env jest, browser */
import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

import App from '../../frontend/App';

/**
 * Hack to make waiting for promise resolutions (such as those from fetch-mock) easier.
 * Ideally only a zero value is preferred for the timeout to reduce flakiness, but it was just
 * not working out.
 **/
const asyncFlush = () => new Promise((resolve) => setTimeout(resolve, 10));

/**
 * WARNING: These tests are unfinished - for now effort will only be put into the cypress tests wrt
 * E2E and integration tests.
 */
describe('Playlist Integration Tests', () => {
  let app;

  afterEach(() => {
    fetchMock.restore();
    app.unmount();
  });

  it('can save a comment', async () => {
    fetchMock.get('path:/playlists', [
      {
        id: 'BLAH',
        name: 'PLAYLIST_NAME',
        url: '',
      },
      {
        id: 'BLAH2',
        name: 'PLAYLIST_2',
        url: '',
      },
      {
        id: 'BLAH3',
        name: 'PLAYLIST_3',
        url: '',
      },
    ]);

    fetchMock.get('path:/playlist/BLAH', {
      id: {
        id: 'BLAH',
        name: 'PLAYLIST_NAME',
        url: '',
      },
      name: 'PLAYLIST NAME',
      description: 'hello description is me',
      songs: [
        {
          id: '01',
          artists: [
            {
              id: 1,
              name: 'Gus Dapperton',
            },
            {
              id: 2,
              name: 'Miley Cyrus',
            },
          ],
          name: 'Hello name 1',
        },
        {
          id: '02',
          artists: [
            {
              id: 1,
              name: 'Gus Dapperton',
            },
            {
              id: 2,
              name: 'Miley Cyrus',
            },
          ],
          name: 'Hello name 2',
        },
      ],
    });

    fetchMock.get('path:/comments/BLAH', {
      '01': 'BLAH',
    });

    const node = document.createElement('div');
    node.id = 'root';
    app = mount(<App />);

    await asyncFlush();
    app.update();

    const playlistButtons = app.find('[data-test="playlist-button-0"]');

    // there is 3 due to the styled components creating two extra elements
    expect(playlistButtons.length).toEqual(3);

    playlistButtons.last().simulate('click');

    await asyncFlush();
    app.update();

    // console.log(app.debug());
    // THESE TESTS ARE UNFINISHED
  });
});
