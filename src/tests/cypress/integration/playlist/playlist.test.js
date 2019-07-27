/** These tests are still a very much hacky */
import fetchMock from 'fetch-mock';

import {
  getSaveButton,
  getCommentBox,
  getCommentInput,
  getPlaylistButton,
} from './page.js';

describe('Playlist Interactions', function() {
  afterEach(() => {
    fetchMock.restore();
  });
  it('can save a comment', function() {
    fetchMock.get('path:/playlists', [
      {
        id: 'BLAH',
        name: 'PLAYLIST_NAME',
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

    cy.visit('/', {
      onBeforeLoad: (win) => {
        cy.stub(win, 'fetch', fetchMock.sandbox()).as('fetch'); // needed to do this to make sure the window.fetch gets mocked
      },
    });

    getPlaylistButton(0).click();
    cy.url().should('include', '/playlists/BLAH');

    getCommentBox().click();

    getCommentInput()
      .type('{selectall}NEW COMMENT')
      .should('have.value', 'NEW COMMENT');

    getSaveButton().click();

    getCommentBox().contains('NEW COMMENT');
  });

  it('can undo editing a comment', function() {
    fetchMock.get('path:/playlists', [
      {
        id: 'BLAH',
        name: 'PLAYLIST_NAME',
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

    cy.visit('/', {
      onBeforeLoad: (win) => {
        cy.stub(win, 'fetch', fetchMock.sandbox()).as('fetch');
      },
    });

    getPlaylistButton(0).click();
    cy.url().should('include', '/playlists/BLAH');

    getCommentBox().click();

    getCommentInput()
      .type('{selectall}fake@email.com')
      .should('have.value', 'fake@email.com');

    cy.contains('Undo').click();

    getCommentBox().contains('BLAH');
  });

  it('can change the comments after changing selected playlist', function() {
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

    fetchMock.get('path:/playlist/BLAH2', {
      id: {
        id: 'BLAH2',
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

    fetchMock.get('path:/comments/BLAH2', {
      '01': 'BLAH2',
    });

    cy.visit('/', {
      onBeforeLoad: (win) => {
        cy.stub(win, 'fetch', fetchMock.sandbox()).as('fetch');
      },
    });

    getPlaylistButton(0).click();
    cy.url().should('include', '/playlists/BLAH');

    getCommentBox().click();

    getPlaylistButton(1).click();

    cy.url().should('include', '/playlists/BLAH2');

    getCommentBox().contains('BLAH2');
  });
});
