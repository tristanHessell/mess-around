import { combineReducers } from 'redux';

import modal from './modal';
import comments from './comments';
import playlist from './playlist';
import playlists from './playlists';

export default combineReducers({
  modal,
  comments,
  playlist,
  'billing.home.entries': createArea('billing.home.entries', combineReducers({playlists, comments})),
  'billing.entries': createArea('billing.entries', combineReducers({playlists})),
  // playlists,
});

function createArea (reducerArea, reducer) {
  return (state, action) => {
    const { area } = action;

    const isInitializationCall = state === undefined

    if (area !== reducerArea && !isInitializationCall) {
      return state;
    }

    return reducer(state, action);
  }
}
