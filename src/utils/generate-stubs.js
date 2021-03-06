const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

module.exports = generateStubs;

const PLAYLISTS = [
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

const getComments = (playlistId) => ({
  '01': playlistId,
});

const getPlaylist = (playlistId) => ({
  id: playlistId,
  name: 'PLAYLIST NAME',
  description: 'hello description is me',
  songs: [
    {
      id: '01',
      artists: [
        { id: 1, name: 'Gus Dapperton' },
        { id: 2, name: 'Miley Cyrus' },
      ],
      name: 'Hello name 1',
    },
    {
      id: '02',
      artists: [
        { id: 1, name: 'Gus Dapperton' },
        { id: 2, name: 'Miley Cyrus' },
      ],
      name: 'Hello name 2',
    },
  ],
});

async function generateStubs() {
  const DATA_PATH = path.resolve(__dirname, '..', 'backend', 'db', 'data');
  await writeFile(
    path.resolve(DATA_PATH, 'playlists', 'data.json'),
    JSON.stringify(PLAYLISTS, undefined, 2),
  );

  await Promise.all(
    PLAYLISTS.map(async (playlist) => {
      return Promise.all([
        writeFile(
          path.resolve(DATA_PATH, 'comments', `${playlist.id}.json`),
          JSON.stringify(getComments(playlist.id), undefined, 2),
        ),
        writeFile(
          path.resolve(DATA_PATH, 'playlist', `${playlist.id}.json`),
          JSON.stringify(getPlaylist(playlist.id), undefined, 2),
        ),
      ]);
    }),
  );
}

(async () => {
  console.log('starting db data stub generation');
  await generateStubs();
  console.log('db data stub generation complete');
})();
