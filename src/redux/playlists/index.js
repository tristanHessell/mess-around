import * as actionTypes from './types';

const DEFAULT_STATE = { playlists: [], isLoading: false};

export default function reducer (state = DEFAULT_STATE, action) {
  switch(action.type) {
    case actionTypes.GET_PLAYLISTS: {
      return {
        ...state,
        playlists: [...action.playlists],
        isLoading: false,
      };
    }
    case actionTypes.LOADING_PLAYLISTS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default: {
      return state;
    }
  }
}
