import { combineReducers } from 'redux';

import comments from './comments';
import playlist from './playlist';
import playlists from './playlists';

export default combineReducers({
  comments,
  playlist,
  playlists,
});