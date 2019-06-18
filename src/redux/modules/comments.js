import uuid from 'uuid/v4';

import * as api from '../../api';

export const actionTypes = {
  GET_COMMENTS_REQUEST: 'spotify-list/comments/GET_COMMENTS_REQUEST',
  GET_COMMENTS_SUCCESS: 'spotify-list/comments/GET_COMMENTS_SUCCESS',
  // GET_COMMENTS_FAILURE: 'spotify-list/comments/GET_COMMENTS_FAILURE', // unused
  SAVE_COMMENTS_REQUEST: 'spotify-list/comments/SAVE_COMMENTS_REQUEST',
  SAVE_COMMENTS_SUCCESS: 'spotify-list/comments/SAVE_COMMENTS_SUCCESS',
  // SAVE_COMMENTS_FAILURE: 'spotify-list/comments/SAVE_COMMENTS_FAILURE', // unused
  // SAVE_CHANGES: 'spotify-list/comments/SAVE_CHANGES', // unused
  UPDATE_COMMENT: 'spotify-list/comments/UPDATE_COMMENT',
};

const DEFAULT_STATE = { playlistId: undefined, canonical: {}, changes: {}, saving: false, loading: undefined };

export default function reducer (state = DEFAULT_STATE, action) {
  switch(action.type) {
    case actionTypes.GET_COMMENTS_SUCCESS: {

      // if the request hasn't been overwritten by another action, save the comments to the store
      if (state.requestId && state.requestId !== action.requestId) {
        return state;
      }

      return {
        ...state,
        canonical: action.comments ? { ...action.comments } : {},
        changes: {},
        saving: false,
        loading: undefined,
      };
    }
    case actionTypes.GET_COMMENTS_REQUEST : {
      return {
        ...state,
        playlistId: action.playlistId,
        loading: {
          requestId: action.requestId,
        },
      };
    }
    case actionTypes.SAVE_COMMENTS_REQUEST : {
      return {
        ...state,
        saving: true,
      };
    }
    case actionTypes.SAVE_COMMENTS_SUCCESS : {
      return {
        ...state,
        canonical: {
          ...state.canonical,
          ...state.changes,
        },
        changes: {},
        saving: false,
      };
    }
    case actionTypes.UPDATE_COMMENT: {
      const { songId, change } = action;

      // if there is no change (if `undo` is pressed) or the change is no different to the canonical,
      // clear the changes for that song
      if (!change || state.canonical[songId] === change) {
        const { [songId]: unusedValue, ...changes} = state.changes; 

        return {
          ...state,
          changes,
        };
      }

      return {
        ...state,
        changes: {
          ...state.changes,
          [songId]: change,
        },
      };
    }
    default: {
      return state;
    }
  };
}

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

export function getCommentsRequest (playlistId, requestId) {
  return {
    type: actionTypes.GET_COMMENTS_REQUEST,
    playlistId,
    requestId,
  };
}

export function getCommentsSuccess (comments, requestId) {
  return {
    type: actionTypes.GET_COMMENTS_SUCCESS,
    comments,
    requestId,
  };
}

export function saveCommentsRequest () {
  return {
    type: actionTypes.SAVE_COMMENTS_REQUEST,
  };
}

export function saveCommentsSuccess () {
  return {
    type: actionTypes.SAVE_COMMENTS_SUCCESS,
  };
}

export function updateComment (songId, change) {
  return {
    type: actionTypes.UPDATE_COMMENT,
    songId,
    change,
  };
}

export function fetchComments (playlistId) {
  return async (dispatch, getState) => {
    const state = commentsSelector(getState()); 

    // if we are trying to request the current playlist, dont do anything
    if (state.playlistId === playlistId) {
      return;
    }

    const requestId = uuid();

    // update the state to show we are requesting
    await dispatch(getCommentsRequest(playlistId, requestId));

    // make the request to get the comments
    const comments = await api.getComments(playlistId);

    // update the redux store with the comments
    return dispatch(getCommentsSuccess(comments, requestId));
  }
}

export function saveComments (playlistId){
  return async (dispatch, getState) => {
    await dispatch(saveCommentsRequest());

    const comments = commentsSelector(getState());
    const changes = {
      ...comments.canonical,
      ...comments.changes,
    };

    await api.saveComments(playlistId, changes);
    return dispatch(saveCommentsSuccess());
  }
}
