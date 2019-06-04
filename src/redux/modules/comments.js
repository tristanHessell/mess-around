import uuid from 'uuid/v4';

import * as api from '../../api';

export const types = {
  SAVE_COMMENTS: 'spotify-list/comments/SAVE_COMMENTS',
  GET_COMMENTS: 'spotify-list/comments/GET_COMMENTS',
  UPDATE_COMMENTS: 'spotify-list/comments/UPDATE_COMMENTS',
  SAVING_COMMENTS: 'spotify-list/comments/SAVING_COMMENT',
  LOADING_COMMENTS: 'spotify-list/comments/LOADING_COMMENTS',
};

const DEFAULT_STATE = { playlistId: undefined, canonical: {}, changes: {}, saving: false, loading: undefined };

export default function reducer (state = DEFAULT_STATE, action) {
  console.log(action.type)
  switch(action.type) {
    case types.GET_COMMENTS: {
      return {
        ...state,
        canonical: action.comments ? { ...action.comments } : {},
        changes: {},
        saving: false,
        loading: undefined,
      };
    }
    case types.SAVING_COMMENTS : {
      return {
        ...state,
        saving: true,
      };
    }
    case types.LOADING_COMMENTS : {
      return {
        ...state,
        playlistId: action.playlistId,
        loading: {
          requestId: action.requestId,
        },
      };
    }
    case types.SAVE_COMMENTS : {
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
    case types.UPDATE_COMMENTS: {
      const { songId, change } = action;

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
export const commentChangesSelector = (comments) => (songId) => {
  if (!comments || !songId) {
    return;
  }

  const { canonical, changes } = comments;
  const canonicalComment = canonical[songId];
  const changedComment = changes[songId];

  const hasChanged = (changedComment !== undefined && changedComment !== null) && changedComment !== canonicalComment;
  const comment = hasChanged ? changedComment : canonicalComment;

  return {
    comment,
    hasChanged,
  };
} 

export function getComments (comments) {
  return {
    type: types.GET_COMMENTS,
    comments,
  };
}

export function loadingComments (playlistId, { requestId }) {
  return {
    type: types.LOADING_COMMENTS,
    playlistId,
    requestId,
  };
}

export function saveComments () {
  return {
    type: types.SAVE_COMMENTS,
  };
}

export function savingComments () {
  return {
    type: types.SAVING_COMMENTS,
  };
}

export function updateComment (songId, change) {
  return {
    type: types.UPDATE_COMMENTS,
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

    if (commentsSelector(getState()).loading.requestId === requestId) {
      // update the redux store with the comments
      return dispatch(getComments(comments));
    }
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