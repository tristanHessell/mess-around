module.exports = {
  getPlaylist,
  savePlaylist,
  getPlaylists,
  getComments,
  saveComments,
};

/**
 *
 */
async function getPlaylist(playlistId) {
  return {
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
  };
}

/**
 *
 */
async function savePlaylist(playlistId, playlist) {
  //
}

/**
 *
 */
async function getPlaylists() {
  return [
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
}

/**
 *
 */
async function getComments(playlistId) {
  return {
    '01': playlistId,
  };
}

/**
 *
 */
async function saveComments(playlistId, comments) {
  //
}
