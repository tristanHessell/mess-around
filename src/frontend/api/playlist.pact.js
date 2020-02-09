/* eslint-env jest */
/**
 * @jest-environment node
 */

const provider = require('./pactProvider');

const api = require('.');

describe('Playlist API', () => {
  beforeAll(async () => {
    await provider.setup();
  });
  describe('works', () => {
    beforeEach(async () => {
      const EXPECTED_BODY = {
        id: 'BLAH',
        // url: '',
        name: 'PLAYLIST NAME',
        description: 'hello description is me',
        songs: [
          {
            id: '01',
            artists: [
              {
                id: 1,
                name: 'Gus Dapperton',
              },
              {
                id: 2,
                name: 'Miley Cyrus',
              },
            ],
            name: 'Hello name 1',
          },
          {
            id: '02',
            artists: [
              {
                id: 1,
                name: 'Gus Dapperton',
              },
              {
                id: 2,
                name: 'Miley Cyrus',
              },
            ],
            name: 'Hello name 2',
          },
        ],
      };
      return provider.addInteraction({
        state: 'a playlist',
        uponReceiving: 'a request for a playlist',
        withRequest: {
          method: 'GET',
          path: '/playlist/BLAH',
          headers: { Accept: 'application/json' },
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: EXPECTED_BODY,
        },
      });
    });

    it('returns a successful body', async () => {
      const id = 'BLAH';
      const playlist = await api.getPlaylist(id);
      expect(playlist.id).toEqual(id);
      expect(Array.isArray(playlist.songs)).toEqual(true);
    });
  });

  describe('with request for non-existing value', () => {
    beforeAll(async () => {
      await provider.addInteraction({
        state: 'a non-present list of playlist',
        uponReceiving: 'a request for non-existent playlist',
        withRequest: {
          method: 'GET',
          path: '/playlist/NOT_FOUND',
          headers: { Accept: 'application/json' },
        },
        willRespondWith: {
          status: 500,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: {},
        },
      });
    });

    it('works with non-present value', async () =>
      await expect(api.getPlaylist('NOT_FOUND')).rejects.toThrow());
  });

  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());
});
