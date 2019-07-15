import { combineReducers } from 'redux';

import modal from './modal';
import comments from './comments';
import playlist from './playlist';
import playlists from './playlists';

export default combineReducers({
  modal,
  comments,
  playlist,
  playlists,
});
