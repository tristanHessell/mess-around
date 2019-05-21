import { combineReducers } from 'redux';

import {
  GET_COMMENTS,
  SAVE_COMMENTS,
  UPDATE_COMMENTS,
  LOADING_COMMENTS,
  SAVING_COMMENTS,
  GET_PLAYLIST,
  LOADING_PLAYLIST,
  GET_PLAYLISTS,
  LOADING_PLAYLISTS,
} from './actions';

const DEFAULT_PLAYLISTS = { canonical: {}, changes: {}, isSaving: false, isLoading: true};
function playlists (state = DEFAULT_PLAYLISTS, action) {
  switch(action.type) {
    case GET_PLAYLISTS: {
      return {
        ...state,
      };
    }
    case LOADING_PLAYLISTS: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}

const DEFAULT_PLAYLIST = { canonical: {}, changes: {}, isSaving: false, isLoading: true};
function playlist (state = DEFAULT_PLAYLIST, action) {
  switch(action.type) {
    case GET_PLAYLIST: {
      return {
        ...state,
        canonical: {...action.playlist},
        changes: {...action.playlist},
        isSaving: false,
        isLoading: false,
      };
    }
    case LOADING_PLAYLIST: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}

const DEFAULT_COMMENTS = { canonical: {}, changes: {}, isSaving: false, isLoading: true};

function comments (state = DEFAULT_COMMENTS, action) {
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

export default combineReducers({
  comments,
  playlist,
  playlists,
});