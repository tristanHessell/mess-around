import * as actionTypes from './types';

const DEFAULT_STATE = {
  id: undefined,
  canonical: {},
  changes: {},
  isSaving: false,
  isLoading: true,
};

export default function reducer (state = DEFAULT_STATE, action) {
  switch(action.type) {
    case actionTypes.GET_PLAYLIST_SUCCESS: {
      return {
        ...state,
        canonical: {...action.playlist},
        changes: {...action.playlist}, // TODO this is lazy
        isSaving: false, // TODO unused
        isLoading: false,
      };
    }
    case actionTypes.GET_PLAYLIST_REQUEST: {
      return {
        ...state,
        canonical: undefined,
        changes: undefined,
        isLoading: true,
        id: action.id,
      };
    }
    default: {
      return state;
    }
  }
}



