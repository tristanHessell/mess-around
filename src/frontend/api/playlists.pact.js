/**
 * @jest-environment node
 */

const provider = require('./pactProvider');

const api = require('.');

describe('Playlists API', () => {
  beforeAll(async () => {
    await provider.setup();
  });
  describe('works', () => {
    beforeEach(async () => {
      const EXPECTED_BODY = [
        {
          id: 'BLAH',
          name: 'PLAYLIST_NAME',
          url: '',
        },
        {
          id: 'BLAH2',
          name: 'PLAYLIST_2',
          url: '',
        },
        {
          id: 'BLAH3',
          name: 'PLAYLIST_3',
          url: '',
        },
      ];
      return provider.addInteraction({
        state: 'a list of playlists',
        uponReceiving: 'a request for playlists',
        withRequest: {
          method: 'GET',
          path: '/playlists',
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
      const playlists = await api.getPlaylists();
      expect(Array.isArray(playlists)).toEqual(true);
    });
  });

  describe('with request for non-existing value', () => {
    beforeAll(async () => {
      await provider.addInteraction({
        state: 'a non-present list of playlists',
        uponReceiving: 'a request for non-existent playlists',
        withRequest: {
          method: 'GET',
          path: '/playlists',
          headers: { Accept: 'application/json' },
        },
        willRespondWith: {
          status: 404,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: {},
        },
      });
    });

    it('works with non-present value', async () =>
      await expect(api.getPlaylists()).rejects.toThrow());
  });

  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());
});
