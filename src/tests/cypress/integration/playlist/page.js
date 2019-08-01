export const getPlaylistButton = (index = 0) => {
  return cy.get(`[data-test=playlist-button-${index}]`);
};

export const getSaveButton = () => {
  return cy.get('[data-test=save-all-button]');
};

// both of these are a bit flaky in that they refer to class names
// but I'd rather that, than polluting the component props with data-test props being passed through
export const getCommentBox = (index = 0) => {
  return cy.get('[class*=SongContainer]').eq(index);
};

export const getCommentInput = (index = 0) => {
  return cy.get('[class*=SongContainer] textarea').eq(index);
};
