export const commentsSelector = (state) => state.comments;

export const commentChangesSelector = (allState) => {
  const state = commentsSelector(allState);

  return (songId) => {
    if (!state || !songId) {
      return;
    }

    const { canonical, changes } = state;
    const canonicalComment = canonical[songId];
    const changedComment = changes[songId];

    const hasChanged = (changedComment !== undefined && changedComment !== null);
    const comment = hasChanged ? changedComment : canonicalComment;

    return {
      comment,
      hasChanged,
    };
  }
}
