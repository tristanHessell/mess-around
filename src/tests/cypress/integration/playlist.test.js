/**
 * This file is super flaky and in no way will remain in this form.
 * Exists as an initial run through of cypress
 */

describe('Playlist Interactions', function() {
  it('can save a comment', function() {
    cy.visit('/');

    cy.contains('PLAYLIST_NAME').click();
    cy.url().should('include', '/playlists/BLAH');
    cy.contains('BLAH').click();

    cy.contains('BLAH')
      .type('NEW COMMENT')
      .should('have.value', 'BLAHNEW COMMENT');

    cy.contains('Save All').click();

    cy.contains('BLAHNEW COMMENT');
  });

  it('can undo editting a comment', function() {
    cy.visit('/');

    cy.contains('PLAYLIST_NAME').click();
    cy.url().should('include', '/playlists/BLAH');
    cy.contains('BLAH').click();

    cy.contains('BLAH')
      .type('fake@email.com')
      .should('have.value', 'BLAHfake@email.com');

    cy.contains('Undo').click();

    cy.contains('BLAH');
  });

  it('can update the comments on changing selected playlist', function() {
    cy.visit('/');

    cy.contains('PLAYLIST_NAME').click();
    cy.url().should('include', '/playlists/BLAH');
    cy.contains('BLAH').click();

    cy.contains('PLAYLIST_2').click();
    cy.contains('BLAH2');
  });
});
