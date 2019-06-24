
import * as actionTypes from './types';

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