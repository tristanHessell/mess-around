/**
 * This file is super flaky and in no way will remain in this form.
 * Exists as an initial run through of cypress
 */

describe('Top Level Interactions', function() {
  it('can save a comment', function() {
    cy.visit('/');

    cy.contains('PLAYLIST_NAME').click();
    cy.url().should('include', '/playlists/BLAH');
    cy.contains('BLAH1').click();

    cy.contains('BLAH1')
      .type('NEW COMMENT')
      .should('have.value', 'BLAH1NEW COMMENT');

    cy.contains('Save All').click();

    cy.contains('BLAH1NEW COMMENT');
  });

  it('can undo editting a comment', function() {
    cy.visit('/');

    cy.contains('PLAYLIST_NAME').click();
    cy.url().should('include', '/playlists/BLAH');
    cy.contains('BLAH1').click();

    cy.contains('BLAH1')
      .type('fake@email.com')
      .should('have.value', 'BLAH1fake@email.com');

    cy.contains('Undo').click();

    cy.contains('BLAH1');
  });

  it('can update the comments on changing selected playlist', function() {
    cy.visit('/');

    cy.contains('PLAYLIST_NAME').click();
    cy.url().should('include', '/playlists/BLAH');
    cy.contains('BLAH1').click();

    cy.contains('PLAYLIST_2').click();
    cy.contains('BLAH2');
  });
});
