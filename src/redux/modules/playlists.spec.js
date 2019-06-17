import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  getPlaylists,
  fetchPlaylists,
  actionTypes,
} from './playlists';

import * as api from '../../api';

jest.mock('../../api')

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Redux: playlists', () => {
  describe('Action Creators', () => {
    it('creates an action to save playlists to store', async () => {
      const expectedAction = { type: actionTypes.GET_PLAYLISTS, playlists: []};

      expect(getPlaylists([])).toEqual(expectedAction);
    });

    it('creates GET_PLAYLISTS when fetching playlists', async () => {
      const expectedActions = [
        { type: actionTypes.GET_PLAYLISTS, playlists: ['irrelevant-to-test'] },
      ];

      const store = mockStore({
        playlists: {
          playlists:[],
        }
      });
      api.getPlaylists.mockResolvedValue(['irrelevant-to-test']);

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
        type: actionTypes.GET_PLAYLISTS,
        playlists: ['test'],
      })).toEqual({
        playlists: ['test'],
        isLoading: false,
      });
    });

    it('should handle LOADING_PLAYLISTS', async () => {
      expect(reducer({
        playlists: ['irrelevant-to-test']
      }, {
        type: actionTypes.LOADING_PLAYLISTS,
      })).toEqual({
        playlists: ['irrelevant-to-test'],
        isLoading: true,
      });
    });
  });
})