import * as api from './api';

/**
 * action types
 */
export const SAVE_COMMENTS = 'SAVE_COMMENTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
export const SAVING_COMMENTS = 'SAVING_COMMENTSLOADING_COMMENTS';
export const LOADING_COMMENTS = 'LOADING_COMMENTS';

export const GET_PLAYLISTS = 'GET_PLAYLISTS';
export const LOADING_PLAYLISTS = 'LOADING_PLAYLISTS';

export const GET_PLAYLIST = 'GET_PLAYLIST';
export const LOADING_PLAYLIST = 'LOADING_PLAYLIST';

/**
 * 
 */

export const commentsSelector = (state) => state.comments;
export const playlistSelector = (state) => state.playlist;

/**
 * action creators
 */

function getComments (comments) {
  return {
    type: GET_COMMENTS,
    comments,
  };
}

function saveComments () {
  return {
    type: SAVE_COMMENTS,
  };
}

function savingComments () {
  return {
    type: SAVING_COMMENTS,
  };
}

function updateComment (songId, change) {
  return {
    type: UPDATE_COMMENTS,
    songId,
    change,
  };
}

function getPlaylist (playlist) {
  return {
    type: GET_PLAYLIST,
    playlist,
  };
}

// fetch - take from outside app
export const fetchComments = (playlistId) => async(dispatch) => {
  const comments = await api.getComments(playlistId);

  return dispatch(getComments(comments));
}

// store - save to outside app
export const storeComments = () => async(dispatch, getState) => {
  await dispatch(savingComments());

  const comments = commentsSelector(getState());
  const changes = {
    ...comments.canonical,
    ...comments.changes,
  };

  await api.saveComments(changes);
  return dispatch(saveComments());
}

// update - save to local app
export const updateComments = (songId, change) => async(dispatch) => {
  return dispatch(updateComment(songId, change));
}

export const fetchPlaylist = (playlistId) => async(dispatch) => {
  const playlist = await api.getPlaylist(playlistId);
  return dispatch(getPlaylist(playlist));
}