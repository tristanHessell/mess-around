/**
 * @jest-environment node
 */

const path = require('path');
const { Pact } = require('@pact-foundation/pact');

const api = require('../../../frontend/api');

describe('Comments API', () => {
  const provider = new Pact({
    consumer: 'SpotifyListApp',
    provider: 'SpotifyListService',
    port: 5000,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'ERROR',
    pactfileWriteMode: 'update',
  });
  const EXPECTED_BODY = {
    '01': 'NEW COMMENT',
  };

  describe('works', () => {
    beforeEach(async () => {
      await provider.setup();
      provider.addInteraction({
        state: 'a list of comments',
        uponReceiving: 'a request for comments',
        withRequest: {
          method: 'GET',
          path: '/comments/BLAH',
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
      const comments = await api.getComments('BLAH');
      expect(typeof comments).toEqual('object');
      expect(Array.isArray(comments)).toEqual(false);
      // body is an object
    });

    afterEach(() => provider.verify());
  });

  afterAll(() => provider.finalize());
});
