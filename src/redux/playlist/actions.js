import * as actionTypes from './types';

import * as api from '../../api';

export function getPlaylistSuccess (playlist) {
  return {
    type: actionTypes.GET_PLAYLIST_SUCCESS,
    playlist,
  };
}

export function getPlaylistRequest (id) {
  return {
    type: actionTypes.GET_PLAYLIST_REQUEST,
    id,
  };
}

// TODO make this cancellable
export function fetchPlaylist (playlistId) {
  return async (dispatch) => {
    dispatch(getPlaylistRequest(playlistId));

    const playlist = await api.getPlaylist(playlistId);

    return dispatch(getPlaylistSuccess(playlist));
  }
}
