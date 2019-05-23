import * as api from '../../api';

const SAVE_COMMENTS = 'spotify-list/comments/SAVE_COMMENTS';
const GET_COMMENTS = 'spotify-list/comments/GET_COMMENTS';
const UPDATE_COMMENTS = 'spotify-list/comments/UPDATE_COMMENTS';
const SAVING_COMMENTS = 'spotify-list/comments/SAVING_COMMENT';
const LOADING_COMMENTS = 'spotify-list/comments/LOADING_COMMENTS';

const DEFAULT_COMMENTS = { canonical: {}, changes: {}, isSaving: false, isLoading: true};

export default function reducer (state = DEFAULT_COMMENTS, action) {
  switch(action.type) {
    case GET_COMMENTS: {
      return {
        ...state,
        canonical: action.comments ? { ...action.comments } : {},
        changes: action.comments ? { ...action.comments } : {},
        isSaving: false,
        isLoading: false,
      };
    }
    case SAVING_COMMENTS : {
      return {
        ...state,
        isSaving: true,
      };
    }
    case LOADING_COMMENTS : {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SAVE_COMMENTS : {
      return {
        ...state,
        canonical: {
          ...state.canonical,
          ...state.changes,
        },
        isSaving: false,
      };
    }
    case UPDATE_COMMENTS: {
      const { songId, change } = action;
      const newChange = change === null || change === undefined ? state.canonical[songId] : change;

      return {
        ...state,
        changes: {
          ...state.changes,
          [songId]: newChange,
        },
      };
    }
    default: {
      return state;
    }
  };
}

export const commentsSelector = (state) => state.comments;

export function getComments (comments) {
  return {
    type: GET_COMMENTS,
    comments,
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
  return async (dispatch) => {
    const comments = await api.getComments(playlistId);

    return dispatch(getComments(comments));
  }
}

// store - save to outside app
export function storeComments (){
  return async (dispatch, getState) => {
    await dispatch(savingComments());

    const comments = commentsSelector(getState());
    const changes = {
      ...comments.canonical,
      ...comments.changes,
    };

    await api.saveComments(changes);
    return dispatch(saveComments());
  }
}

// update - save to local app
export function updateComments (songId, change) {
  return async (dispatch) => {
    return dispatch(updateComment(songId, change));
  };
}