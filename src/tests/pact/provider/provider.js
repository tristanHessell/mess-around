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

new Verifier().verifyProvider(opts).then(() => {
  console.log('POST VERIFYING PROVIDERS');
});
