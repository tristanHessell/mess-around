import uuid from 'uuid/v4';

import * as api from '../../api';

export const actionTypes = {
  SAVE_COMMENTS: 'spotify-list/comments/SAVE_COMMENTS', //TODO rename this to SAVE_CHANGES
  GET_COMMENTS: 'spotify-list/comments/GET_COMMENTS',
  UPDATE_COMMENTS: 'spotify-list/comments/UPDATE_COMMENTS',
  SAVING_COMMENTS: 'spotify-list/comments/SAVING_COMMENT',
  LOADING_COMMENTS: 'spotify-list/comments/LOADING_COMMENTS',
};

const DEFAULT_STATE = { playlistId: undefined, canonical: {}, changes: {}, saving: false, loading: undefined };

export default function reducer (state = DEFAULT_STATE, action) {
  switch(action.type) {
    case actionTypes.GET_COMMENTS: {

      // if the request hasn't been overwritten by another action, save the comments to the store
      if (state.requestId !== action.requestId) {
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
    case actionTypes.SAVING_COMMENTS : {
      return {
        ...state,
        saving: true,
      };
    }
    case actionTypes.LOADING_COMMENTS : {
      return {
        ...state,
        playlistId: action.playlistId,
        loading: {
          requestId: action.requestId,
        },
      };
    }
    case actionTypes.SAVE_COMMENTS : {
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
    case actionTypes.UPDATE_COMMENTS: {
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

/**
 * not to be used with redux/useSelector.
 * 
 * Just experimenting!
 * */
export const commentChangesSelector = (state) => (songId) => {
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

export function getComments (comments, requestId) {
  return {
    type: actionTypes.GET_COMMENTS,
    comments,
    requestId,
  };
}

export function loadingComments (playlistId, { requestId }) {
  return {
    type: actionTypes.LOADING_COMMENTS,
    playlistId,
    requestId,
  };
}

export function saveComments () {
  return {
    type: actionTypes.SAVE_COMMENTS,
  };
}

export function savingComments () {
  return {
    type: actionTypes.SAVING_COMMENTS,
  };
}

export function updateComment (songId, change) {
  return {
    type: actionTypes.UPDATE_COMMENTS,
    songId,
    change,
  };
}

// fetch - take from outside app
export function fetchComments (playlistId) {
  return async (dispatch, getState) => {
    const state = commentsSelector(getState()); 

    // if we are trying to request the current playlist, dont do anything
    if (state.playlistId === playlistId) {
      return;
    }

    const requestId = uuid();

    // update the state to show we are requesting
    await dispatch(loadingComments(playlistId, {requestId}));

    // make the request to get the comments
    const comments = await api.getComments(playlistId);

    // update the redux store with the comments
    return dispatch(getComments(comments, requestId));
  }
}

// store - save to outside app
export function storeComments (playlistId){
  return async (dispatch, getState) => {
    await dispatch(savingComments());

    const comments = commentsSelector(getState());
    const changes = {
      ...comments.canonical,
      ...comments.changes,
    };

    await api.saveComments(playlistId, changes);
    return dispatch(saveComments());
  }
}

// update - save to local app
export function updateComments (songId, change) {
  return async (dispatch) => {
    return dispatch(updateComment(songId, change));
  };
}