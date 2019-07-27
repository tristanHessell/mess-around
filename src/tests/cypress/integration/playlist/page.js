export const getPlaylistButton = (index = 0) => {
  return cy.get(`[data-test=playlist-button-${index}]`);
};

export const getSaveButton = () => {
  return cy.get('[data-test=save-all-button]');
};

export const getCommentBox = () => {
  return cy.get('[class*=SongContainer]').first();
};

export const getCommentInput = () => {
  return cy.get('[class*=SongContainer] textarea').first();
};
