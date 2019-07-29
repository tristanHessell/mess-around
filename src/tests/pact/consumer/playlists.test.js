/**
 * @jest-environment node
 */

const path = require('path');
const { Pact } = require('@pact-foundation/pact');

const api = require('../../../frontend/api');

describe('Playlists API', () => {
  const provider = new Pact({
    consumer: 'SpotifyListApp',
    provider: 'SpotifyListService',
    port: 5000,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'INFO',
  });
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
          // headers: { Accept: 'application/json' },
        },
        willRespondWith: {
          status: 200,
          headers: { Accept: 'application/json' },
          body: EXPECTED_BODY,
        },
      });
    });

    it('returns a successful body', async () => {
      const playlists = await api.getPlaylists();
      // expect(playlists).to
    });

    afterEach(() => provider.verify());
  });

  afterAll(() => provider.finalize());
});
