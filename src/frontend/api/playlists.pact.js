/**
 * @jest-environment node
 */

const provider = require('./pactProvider');

const api = require('.');

describe('Playlists API', () => {
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

  describe('works', () => {
    beforeEach(async () => {
      await provider.setup();
      provider.addInteraction({
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

    afterEach(() => provider.verify());
  });

  afterAll(() => provider.finalize());
});
