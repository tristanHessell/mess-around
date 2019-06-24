import * as actionTypes from './types';

import * as api from '../../api';

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
