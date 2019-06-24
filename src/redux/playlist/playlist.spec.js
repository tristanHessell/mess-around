import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer from './index';
import {
  getPlaylistSuccess,
  getPlaylistRequest,
  fetchPlaylist,
} from './actions';
import * as actionTypes from './types';

import * as api from '../../api';

jest.mock('../../api')

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Redux: playlist', () => {
  describe('Action Creators', () => {
    it('creates an action to save playlists to store', async () => {
      const expectedAction = { type: actionTypes.GET_PLAYLIST_REQUEST, id: 'playlistId' };

      expect(getPlaylistRequest('playlistId')).toEqual(expectedAction);
    });
    it('creates an action to save playlists to store', async () => {
      const expectedAction = { type: actionTypes.GET_PLAYLIST_SUCCESS, playlist: { the: 'playlist' }};

      expect(getPlaylistSuccess({ the: 'playlist' })).toEqual(expectedAction);
    });
    it('creates actions when fetching playlist', async () => {
      const expectedActions = [
        { type: actionTypes.GET_PLAYLIST_REQUEST, id: 'playlistId' },
        { type: actionTypes.GET_PLAYLIST_SUCCESS, playlist: { the: 'playlist' } },
      ];

      const store = mockStore({});
      api.getPlaylist.mockResolvedValue({ the: 'playlist' });

      await store.dispatch(fetchPlaylist('playlistId'));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Reducer', () => {
    it('should return the initial state', async () => {
      expect(reducer(undefined, {})).toEqual({
        id: undefined,
        canonical: {},
        changes: {},
        isSaving: false,
        isLoading: true,
      });
    });

    it('should handle GET_PLAYLIST_SUCCESS', async () => {
      expect(reducer({
        canonical: undefined,
        changes: undefined,
        isLoading: false,
        id: 'playlistId',
      }, {
        type: actionTypes.GET_PLAYLIST_SUCCESS,
        playlist: { the: 'playlist'},
      })).toEqual({
        canonical: { the: 'playlist' },
        changes: { the: 'playlist' },
        isLoading: false,
        isSaving: false,
        id: 'playlistId',
      });
    });

    it('should handle GET_PLAYLIST_REQUEST', async () => {
      expect(reducer({
        canonical: undefined,
        changes: undefined,
        isLoading: true,
        id: 'ID_GETS_OVERWRITTEN',
      }, {
        type: actionTypes.GET_PLAYLIST_REQUEST,
        id: 'playlistId',
      })).toEqual({
        canonical: undefined,
        changes: undefined,
        isLoading: true,
        id: 'playlistId',
      });
    });
  });
})