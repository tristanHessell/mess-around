/** These tests are still a very much hacky */
import fetchMock from 'fetch-mock';

describe('Playlist Interactions', function() {
  // TODO putting the mocking here is lazy - move it to each test
  beforeEach(() => {
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
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('can save a comment', function() {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        cy.stub(win, 'fetch', fetchMock.sandbox()).as('fetch'); // needed to do this to make sure the window.fetch gets mocked
      },
    });

    cy.get('[data-test=playlist-button-0]').click();
    cy.url().should('include', '/playlists/BLAH');

    cy.get('[class*=SongContainer]')
      .first()
      .click();

    cy.get('[class*=SongContainer] textarea')
      .first()
      .type('{selectall}NEW COMMENT')
      .should('have.value', 'NEW COMMENT');

    cy.get('[data-test=save-all-button]').click();

    cy.get('[class*=SongContainer]')
      .first()
      .contains('NEW COMMENT');
  });

  it('can undo editing a comment', function() {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        cy.stub(win, 'fetch', fetchMock.sandbox()).as('fetch');
      },
    });

    cy.get('[data-test=playlist-button-0]').click();
    cy.url().should('include', '/playlists/BLAH');

    cy.get('[class*=SongContainer]')
      .first()
      .click();

    cy.get('[class*=SongContainer] textarea')
      .first()
      .type('{selectall}fake@email.com')
      .should('have.value', 'fake@email.com');

    cy.contains('Undo').click();

    cy.get('[class*=SongContainer]')
      .first()
      .contains('BLAH');
  });

  it('can update the comments on changing selected playlist', function() {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        cy.stub(win, 'fetch', fetchMock.sandbox()).as('fetch');
      },
    });

    cy.get('[data-test=playlist-button-0]').click();
    cy.url().should('include', '/playlists/BLAH');

    cy.get('[class*=SongContainer]')
      .first()
      .click();

    cy.get('[data-test=playlist-button-1]').click();

    cy.url().should('include', '/playlists/BLAH2');

    cy.get('[class*=SongContainer]')
      .first()
      .contains('BLAH2');
  });
});
