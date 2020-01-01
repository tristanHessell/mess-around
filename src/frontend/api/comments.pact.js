/**
 * @jest-environment node
 */

const provider = require('./pactProvider');

const api = require('.');

describe('Comments API', () => {
  beforeAll(async () => {
    await provider.setup();
  });

  describe('with request for existing value', () => {
    beforeAll(async () => {
      const EXPECTED_BODY = {
        '01': 'BLAH',
      };

      await provider.addInteraction({
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

    it('works with present value', async () => {
      const comments = await api.getComments('BLAH');
      expect(typeof comments).toEqual('object');
      expect(Array.isArray(comments)).toEqual(false);
    });
  });

  describe('with request for non-existing value', () => {
    beforeAll(async () => {
      await provider.addInteraction({
        state: 'a non-present list of comments',
        uponReceiving: 'a request for non-existent comments',
        withRequest: {
          method: 'GET',
          path: '/comments/NOT_FOUND',
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
      await expect(api.getComments('NOT_FOUND')).rejects.toThrow());
  });

  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());
});
