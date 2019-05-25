import * as api from '../../api';

const GET_PLAYLISTS = 'spotify-list/playlists/GET_PLAYLISTS';
const LOADING_PLAYLISTS = 'spotify-list/playlists/LOADING_PLAYLISTS';

const DEFAULT_PLAYLISTS = { playlists: {}, isLoading: true};

export default function reducer (state = DEFAULT_PLAYLISTS, action) {
  switch(action.type) {
    case GET_PLAYLISTS: {
      return {
        ...state,
        playlists: [...action.playlists],
        isLoading: false,
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

export const playlistsSelector = (state) => state.playlists;

export function getPlaylists (playlists) {
  return {
    type: GET_PLAYLISTS,
    playlists,
  };
}

export function fetchPlaylists () {
  return async (dispatch) => {
    const playlists = await api.getPlaylists();
    return dispatch(getPlaylists(playlists));
  }
}