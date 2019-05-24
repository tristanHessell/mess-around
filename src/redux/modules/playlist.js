import * as api from '../../api';

const GET_PLAYLIST = 'spotify-list/playlist/GET_PLAYLIST';
const LOADING_PLAYLIST = 'spotify-list/playlist/LOADING_PLAYLIST';

const DEFAULT_PLAYLIST = { canonical: {}, changes: {}, isSaving: false, isLoading: true};

export default function reducer (state = DEFAULT_PLAYLIST, action) {
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
        canonical: undefined,
        changes: undefined,
        isLoading: true,
      };
    }
    default: {
      return state;
    }
  }
}

export const playlistSelector = (state) => state.playlist;

export function getPlaylist (playlist) {
  return {
    type: GET_PLAYLIST,
    playlist,
  };
}

export function loadingPlaylist () {
  return {
    type: LOADING_PLAYLIST,
  };
}

export function fetchPlaylist (playlistId) {
  return async (dispatch) => {
    dispatch(loadingPlaylist());
    const playlist = await api.getPlaylist(playlistId);
    return dispatch(getPlaylist(playlist));
  }
}
