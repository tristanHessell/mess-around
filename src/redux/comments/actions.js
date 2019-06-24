
import uuid from 'uuid/v4';

import * as actionTypes from './types';
import {
  commentsSelector,
} from './selectors';

import * as api from '../../api';

export function getCommentsRequest (playlistId, requestId) {
  return {
    type: actionTypes.GET_COMMENTS_REQUEST,
    playlistId,
    requestId,
  };
}

export function getCommentsSuccess (comments, requestId) {
  return {
    type: actionTypes.GET_COMMENTS_SUCCESS,
    comments,
    requestId,
  };
}

export function saveCommentsRequest () {
  return {
    type: actionTypes.SAVE_COMMENTS_REQUEST,
  };
}

export function saveCommentsSuccess () {
  return {
    type: actionTypes.SAVE_COMMENTS_SUCCESS,
  };
}

export function updateComment (songId, change) {
  return {
    type: actionTypes.UPDATE_COMMENT,
    songId,
    change,
  };
}

export function fetchComments (playlistId) {
  return async (dispatch, getState) => {
    const state = commentsSelector(getState()); 

    // if we are trying to request the current playlist, dont do anything
    if (state.playlistId === playlistId) {
      return;
    }

    const requestId = uuid();

    // update the state to show we are requesting
    await dispatch(getCommentsRequest(playlistId, requestId));

    // make the request to get the comments
    const comments = await api.getComments(playlistId);

    // update the redux store with the comments
    return dispatch(getCommentsSuccess(comments, requestId));
  }
}

export function saveComments (playlistId){
  return async (dispatch, getState) => {
    await dispatch(saveCommentsRequest());

    const comments = commentsSelector(getState());
    const changes = {
      ...comments.canonical,
      ...comments.changes,
    };

    await api.saveComments(playlistId, changes);
    return dispatch(saveCommentsSuccess());
  }
}
