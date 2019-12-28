// TODO i dont like this file name

const path = require('path');
const { Pact } = require('@pact-foundation/pact');

const WRITE_MODE = process.env.ENV === 'CI' ? 'none' : 'update';

const provider = new Pact({
  consumer: 'SpotifyListApp',
  provider: 'SpotifyListService',
  port: 5000,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'src/tests', 'pact'),
  logLevel: 'ERROR',
  pactfileWriteMode: 'update',
});

const ORIGINAL_FINALIZE = provider.finalize;
provider.finalize = () => {
  if (WRITE_MODE === 'none') {
    return;
  }

  return ORIGINAL_FINALIZE.call(provider);
};

module.exports = provider;
