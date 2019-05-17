// this is where talking to servers go

const PLAYLIST = {
  id: '',
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