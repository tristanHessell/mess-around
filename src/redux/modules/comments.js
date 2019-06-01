import * as api from '../../api';

const SAVE_COMMENTS = 'spotify-list/comments/SAVE_COMMENTS';
const GET_COMMENTS = 'spotify-list/comments/GET_COMMENTS';
const UPDATE_COMMENTS = 'spotify-list/comments/UPDATE_COMMENTS';
const SAVING_COMMENTS = 'spotify-list/comments/SAVING_COMMENT';
const LOADING_COMMENTS = 'spotify-list/comments/LOADING_COMMENTS';

const DEFAULT = { playlistId: undefined, canonical: {}, changes: {}, saving: false, loading: undefined };

export default function reducer (state = DEFAULT, action) {
  switch(action.type) {
    case GET_COMMENTS: {
      return {
        ...state,
        canonical: action.comments ? { ...action.comments } : {},
        changes: {},
        saving: false,
        loading: undefined,
      };
    }
    case SAVING_COMMENTS : {
      return {
        ...state,
        saving: true,
      };
    }
    case LOADING_COMMENTS : {
      return {
        ...state,
        playlistId: action.playlistId,
        loading: {
          abort: action.abort,
        },
      };
    }
    case SAVE_COMMENTS : {
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
    case UPDATE_COMMENTS: {
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
    type: GET_COMMENTS,
    comments,
  };
}

export function loadingComments (playlistId, { abort }) {
  return {
    type: LOADING_COMMENTS,
    playlistId,
    abort,
  };
}

export function saveComments () {
  return {
    type: SAVE_COMMENTS,
  };
}

export function savingComments () {
  return {
    type: SAVING_COMMENTS,
  };
}

export function updateComment (songId, change) {
  return {
    type: UPDATE_COMMENTS,
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

    // if there is a pending request for comments at the moment, cancel that one and then do our own
    if (state.loading) {
      state.loading.abort();
    }

    // make the request to get the comments
    const { payload, abort } = api.getComments(playlistId);

    // update the state to show we are requesting
    await dispatch(loadingComments(playlistId, {abort}));

    // get the actual comments
    const comments = await payload;

    // update the redux store with the comments
    return dispatch(getComments(comments));
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