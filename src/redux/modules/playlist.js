import * as api from '../../api';

export const types = {
  GET_PLAYLIST: 'spotify-list/playlist/GET_PLAYLIST',
  LOADING_PLAYLIST: 'spotify-list/playlist/LOADING_PLAYLIST',
};

const DEFAULT_STATE = { id: undefined, canonical: {}, changes: {}, isSaving: false, isLoading: true};

export default function reducer (state = DEFAULT_STATE, action) {
  switch(action.type) {
    case types.GET_PLAYLIST: {
      return {
        ...state,
        canonical: {...action.playlist},
        changes: {...action.playlist},
        isSaving: false,
        isLoading: false,
      };
    }
    case types.LOADING_PLAYLIST: {
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

export const playlistSelector = (state) => state.playlist;

export function getPlaylist (playlist) {
  return {
    type: types.GET_PLAYLIST,
    playlist,
  };
}

export function loadingPlaylist (id) {
  return {
    type: types.LOADING_PLAYLIST,
    id,
  };
}

export function fetchPlaylist (playlistId) {
  return async (dispatch) => {
    dispatch(loadingPlaylist(playlistId));
    const playlist = await api.getPlaylist(playlistId);
    return dispatch(getPlaylist(playlist));
  }
}
