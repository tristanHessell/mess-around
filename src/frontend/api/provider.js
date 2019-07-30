const path = require('path');
const { Verifier } = require('@pact-foundation/pact');

const opts = {
  providerBaseUrl: 'http://localhost:5000',
  provider: 'SpotifyListService',
  pactUrls: [
    path.resolve(
      process.cwd(),
      './pacts/spotifylistapp-spotifylistservice.json',
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
