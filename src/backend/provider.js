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

async function verify() {
  try {
    await new Verifier(opts).verifyProvider();
    console.log('POST VERIFYING PROVIDERS');
  } catch (error) {
    console.log('Pact verification failed', error);
  }
}

verify();
