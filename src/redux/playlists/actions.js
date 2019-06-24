import * as actionTypes from './types';

import * as api from '../../api';

export function getPlaylistsSuccess (playlists) {
  return {
    type: actionTypes.GET_PLAYLISTS_SUCCESS,
    playlists,
  };
}

export function fetchPlaylists () {
  return async (dispatch) => {
    const playlists = await api.getPlaylists();
    return dispatch(getPlaylistsSuccess(playlists));
  }
}
