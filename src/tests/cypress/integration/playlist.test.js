/** These tests are still a very much hacky */

describe('Playlist Interactions', function() {
  beforeEach(() => {
    // change the data in the "DB"
    cy.exec('node ../utils/generate-stubs');
  });

  it('can save a comment', function() {
    cy.visit('/');

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
    cy.visit('/');

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
    cy.visit('/');

    cy.get('[data-test=playlist-button-0]').click();
    cy.url().should('include', '/playlists/BLAH');

    cy.get('[class*=SongContainer]')
      .first()
      .click();

    cy.get('[data-test=playlist-button-1]').click();

    cy.get('[class*=SongContainer]')
      .first()
      .contains('BLAH2');
  });
});
