/**
 * @jest-environment node
 */

const provider = require('./pactProvider');

const api = require('.');

describe('Comments API', () => {
  const EXPECTED_BODY = {
    '01': 'BLAH',
  };

  describe('works', () => {
    beforeEach(async () => {
      await provider.setup();
      return provider.addInteraction({
        state: 'a list of comments',
        uponReceiving: 'a request for comments',
        withRequest: {
          method: 'GET',
          path: '/comments/BLAH',
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
      const comments = await api.getComments('BLAH');
      expect(typeof comments).toEqual('object');
      expect(Array.isArray(comments)).toEqual(false);
    });

    afterEach(() => provider.verify());
  });

  afterAll(() => provider.finalize());
});
