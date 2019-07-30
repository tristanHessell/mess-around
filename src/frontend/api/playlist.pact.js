/**
 * @jest-environment node
 */

const path = require('path');
const { Pact } = require('@pact-foundation/pact');

const api = require('./api');

describe('Playlist API', () => {
  const provider = new Pact({
    consumer: 'SpotifyListApp',
    provider: 'SpotifyListService',
    port: 5000,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'src/tests', 'pact'),
    logLevel: 'ERROR',
    pactfileWriteMode: 'update',
  });
  const EXPECTED_BODY = {
    id: 'BLAH',
    url: '',
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

  describe('works', () => {
    beforeEach(async () => {
      await provider.setup();
      provider.addInteraction({
        state: 'a playlist',
        uponReceiving: 'a request for a playlist',
        withRequest: {
          method: 'GET',
          path: '/playlist/BLAH',
          // headers: { Accept: 'application/json' },
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

    afterEach(() => provider.verify());
  });

  afterAll(() => provider.finalize());
});
