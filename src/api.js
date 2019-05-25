// this is where talking to servers go

const PLAYLISTS = [{
  id: 'BLAH',
  name: 'PLAYLIST_NAME',
},{
  id: 'BLAH2',
  name: 'PLAYLIST_2',
}];

const PLAYLIST = {
  id: 'BLAH',
  name: 'PLAYLIST NAME',
  description: 'hello description is me',
  songs: [{
    id: '01',
    artists: [{ id: 1, name: 'Gus Dapperton'}, { id: 2, name: 'Miley Cyrus'}],
    name: 'Hello name 1',
  }, {
    id: '02',
    artists: [{ id: 1, name: 'Gus Dapperton'}, { id: 2, name: 'Miley Cyrus'}],
    name: 'Hello name 2',
  }],
};

const COMMENTS = {'01': 'badas'}


export function getPlaylists () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(PLAYLISTS);
    }, 500)
  });
};

export function getPlaylist (playlistId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(PLAYLIST);
    }, 500)
  });
};

export function getComments (playlistId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(COMMENTS);
    }, 500)
  });
};

export function saveComments (comments) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 500)
  });
};