/* eslint-env jest, jasmine */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as api from '../../api';
import uuid from 'uuid/v4';

import reducer from './index';
import * as actionTypes from './types';
import {
  commentChangesSelector,
} from './selectors';
import {
  getCommentsRequest,
  getCommentsSuccess,
  saveCommentsRequest,
  saveCommentsSuccess,
  updateComment,
  fetchComments,
  saveComments,
} from './actions';

jest.mock('../../api');
jest.mock('uuid/v4');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Redux: comments', () => {
  describe('Action Creators', () => {
    it('creates an action to show getting comments in progress', async () => {
      const expectedAction = {
        type: actionTypes.GET_COMMENTS_REQUEST,
        playlistId: 'playlistId',
        requestId: 'requestId'
      };
      expect(getCommentsRequest('playlistId', 'requestId')).toEqual(expectedAction);
    });

    it('creates an action when getting comments succeeds', async () => {
      const expectedAction = { type: actionTypes.GET_COMMENTS_SUCCESS, comments: {}};
      expect(getCommentsSuccess({})).toEqual(expectedAction);
    });

    it('creates an action to show saving comments in progress', async () => {
      const expectedAction = {
        type: actionTypes.SAVE_COMMENTS_REQUEST,
      };
      expect(saveCommentsRequest()).toEqual(expectedAction);
    });

    it('creates an action when saving comments succeeds', async () => {
      const expectedAction = {
        type: actionTypes.SAVE_COMMENTS_SUCCESS,
      };
      expect(saveCommentsSuccess()).toEqual(expectedAction);
    });

    it('creates an action to update a comment', async () => {
      const expectedAction = {
        type: actionTypes.UPDATE_COMMENT,
        songId: 'songId',
        change: 'change',
      };
      expect(updateComment('songId', 'change')).toEqual(expectedAction);
    });

    it('loads & gets comments when fetching', async () => {
      const expectedActions = [
        { type: actionTypes.GET_COMMENTS_REQUEST, playlistId: 'new-playlistId', requestId: 'requestId' },
        { type: actionTypes.GET_COMMENTS_SUCCESS, comments: ['irrelevant-to-test'], requestId: 'requestId' },
      ];
      const store = mockStore({
        comments: {
          playlistId: 'initial-playlistId',
        },
      });

      api.getComments.mockResolvedValue(['irrelevant-to-test']);
      uuid.mockReturnValue('requestId');

      await store.dispatch(fetchComments('new-playlistId'));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('does nothing if we are already fetching the requested comments', async () => {
      const expectedActions = [];
      const store = mockStore({
        comments: {
          playlistId: 'playlistId',
        },
      });

      await store.dispatch(fetchComments('playlistId'));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('sends actions when storing comments', async () => {
      const expectedActions = [
        { type: actionTypes.SAVE_COMMENTS_REQUEST },
        { type: actionTypes.SAVE_COMMENTS_SUCCESS },
      ];
      const store = mockStore({
        comments: {
          canonical: [],
          changes: [],
        },
      });

      api.saveComments.mockResolvedValue(['irrelevant-to-test']);

      await store.dispatch(saveComments('new-playlistId'));

      expect(store.getActions()).toEqual(expectedActions);
    });

    // unimplemented - TODO decide on an error case pattern
    xit('leaves the store unchanged if saving comments fails', async () => {

    });

    it('sends actions when updating comments', async () => {
      const expectedActions = [
        { type: actionTypes.UPDATE_COMMENT, songId: 'songId', change: 'new comment' },
      ];
      const store = mockStore({
        comments: {
          canonical: [],
          changes: [],
        },
      });

      await store.dispatch(updateComment('songId', 'new comment'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Reducer', () => {
    it('should return the initial state', async () => {
      expect(reducer(undefined, {})).toEqual({
        playlistId: undefined,
        canonical: {},
        changes: {},
        saving: false,
        loading: undefined,
      });
    });

    it('should handle GET_COMMENTS_SUCCESS with no request in progress', async () => {
      expect(reducer({}, {
        type: actionTypes.GET_COMMENTS_SUCCESS,
        requestId: '1234',
        comments: { comment1: 'la la la' },
      })).toEqual({
        canonical: { comment1: 'la la la' },
        changes: {},
        saving: false,
        loading: undefined,
      });
    });

    it('should handle GET_COMMENTS_SUCCESS with another request in progress', async () => {
      expect(reducer({
        requestId: 'secondOne'
      }, {
        type: actionTypes.GET_COMMENTS_SUCCESS,
        comments: { comment1: 'la la la' },
        requestId: 'firstOne'
      })).toEqual({
        requestId: 'secondOne'
      });
    });

    it('should handle SAVE_COMMENTS_REQUEST', async () => {
      expect(reducer({}, {
        type: actionTypes.SAVE_COMMENTS_REQUEST,
      })).toEqual({
        saving: true,
      });
    });

    it('should handle GET_COMMENTS_REQUEST', async () => {
      expect(reducer({}, {
        type: actionTypes.GET_COMMENTS_REQUEST,
        playlistId: 'playlistId',
        requestId: 'requestId',
      })).toEqual({
        playlistId: 'playlistId',
        loading: {
          requestId: 'requestId',
        },
      });
    });

    it('should handle SAVE_COMMENTS_SUCCESS', async () => {
      expect(reducer({
        canonical: {
          song1: 'overwritten comment',
          song2: 'unchanged comment',
        },
        changes: {
          song1: 'comment that overwrites',
        },
      }, {
        type: actionTypes.SAVE_COMMENTS_SUCCESS,
      })).toEqual({
        canonical: {
          song1: 'comment that overwrites',
          song2: 'unchanged comment',
        },
        changes: {},
        saving: false,
      });
    });

    it('should handle UPDATE_COMMENT with change specified', async () => {
      expect(reducer({
        canonical: {
          song1: 'original comment 1',
          song2: 'original comment 2',
        },
        changes: {
        },
      }, {
        type: actionTypes.UPDATE_COMMENT,
        songId: 'song1',
        change: 'changed comment 1',
      })).toEqual({
        canonical: {
          song1: 'original comment 1',
          song2: 'original comment 2',
        },
        changes: {
          song1: 'changed comment 1',
        },
      });
    });

    it('should handle UPDATE_COMMENT with no change specified', async () => {
      expect(reducer({
        canonical: {
          song1: 'original comment 1',
          song2: 'original comment 2',
        },
        changes: {
          song1: 'changed comment 1',
        },
      }, {
        type: actionTypes.UPDATE_COMMENT,
        songId: 'song1',
      })).toEqual({
        canonical: {
          song1: 'original comment 1',
          song2: 'original comment 2',
        },
        changes: {},
      });
    });

    it('should handle UPDATE_COMMENT with specified change same as canonical', async () => {
      expect(reducer({
        canonical: {
          song1: 'original comment 1',
          song2: 'original comment 2',
        },
        changes: {
          song1: 'changed comment 1',
        },
      }, {
        type: actionTypes.UPDATE_COMMENT,
        songId: 'song1',
        change: 'original comment 1',
      })).toEqual({
        canonical: {
          song1: 'original comment 1',
          song2: 'original comment 2',
        },
        changes: {},
      });
    });
  });

  describe('Custom', () => {
    describe('commentChangesSelector', () => {
      it('should return undefined if there is no song specified', async () => {
        const state = {
          comments: {
            changes: {},
            canonical: {},
          }
        };

        const selector = commentChangesSelector(state);

        expect(selector()).toEqual(undefined);
      });

      it('should return empty comment if there is none for specifed id', async () => {
        const state = {
          comments: {
            changes: {},
            canonical: {},
          }
        };

        const selector = commentChangesSelector(state);

        expect(selector('songId')).toEqual({comment: undefined, hasChanged: false});
      });

      it('should get the change if it exists', async () => {
        const state = {
          comments: {
            changes: {
              changeId: '123',
            },
            canonical: {
              changeId: 'OLD',
            },
          }
        };

        const selector = commentChangesSelector(state);

        expect(selector('changeId')).toEqual({
          comment: '123',
          hasChanged: true,
        });
      });

      it('should return the canonical if there are no changes', async () => {
        const state = {
          comments: {
            changes: {
              notRelevantId: 'ABC',
            },
            canonical: {
              notChangeId: '123',
            },
          }
        };

        const selector = commentChangesSelector(state);

        expect(selector('notChangeId')).toEqual({
          comment: '123',
          hasChanged: false,
        });
      });
    });

  });
})