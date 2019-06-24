import * as api from '../../api';

export const actionTypes = {
  GET_PLAYLISTS: 'spotify-list/playlists/GET_PLAYLISTS',
  LOADING_PLAYLISTS: 'spotify-list/playlists/LOADING_PLAYLISTS',
};

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

export const playlistsSelector = (state) => state.playlists;

export function getPlaylists (playlists) {
  return {
    type: actionTypes.GET_PLAYLISTS,
    playlists,
  };
}

export function fetchPlaylists () {
  return async (dispatch) => {
    const playlists = await api.getPlaylists();
    return dispatch(getPlaylists(playlists));
  }
}