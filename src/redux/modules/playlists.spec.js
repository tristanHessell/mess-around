import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  getPlaylists,
  fetchPlaylists,
  types,
} from './playlists';

import * as api from '../../api';

jest.mock('../../api')

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Redux playlists', () => {
  describe('Action Creators', () => {
    it('creates an action to save playlists to store', async () => {
      const expectedAction = { type: types.GET_PLAYLISTS, playlists: []};

      expect(getPlaylists([])).toEqual(expectedAction);
    });

    it('creates GET_PLAYLISTS when fetching playlists', async () => {
      const expectedActions = [
        { type: types.GET_PLAYLISTS, playlists: []},
      ];

      const store = mockStore({ playlists: []});
      api.getPlaylists.mockResolvedValue([]);

      await store.dispatch(fetchPlaylists('DUMMY_ID'));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Reducer', () => {
    it('should return the initial state', async () => {
      expect(reducer(undefined, {})).toEqual({
        playlists: [],
        isLoading: false,
      });
    });

    it('should handle GET_PLAYLISTS', async () => {
      expect(reducer({
        playlists: [],
      }, {
        type: types.GET_PLAYLISTS,
        playlists: ['test'],
      })).toEqual({
        playlists: ['test'],
        isLoading: false,
      });
    });

    it('should handle LOADING_PLAYLISTS', async () => {
      expect(reducer({
        playlists: ['not-used-here']
      }, {
        type: types.LOADING_PLAYLISTS,
      })).toEqual({
        playlists: ['not-used-here'],
        isLoading: true,
      });
    });
  });
})