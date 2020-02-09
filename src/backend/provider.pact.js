/* eslint-env jest */
/* global ENV */

const path = require('path');
const { Verifier } = require('@pact-foundation/pact');

const opts = {
  providerBaseUrl: ENV.API_URL,
  provider: 'SpotifyListService',
  pactUrls: [
    path.resolve(
      __dirname,
      '../tests/pact/spotifylistapp-spotifylistservice.json',
    ),
  ],
};

describe('PactJs Provider Tests', () => {
  it('should work', async () => new Verifier(opts).verifyProvider());
});
