// this is where talking to servers go

const PLAYLISTS = [{
  id: 'BLAH',
  name: 'PLAYLIST_NAME',
},{
  id: 'BLAH2',
  name: 'PLAYLIST_2',
}, {
  id: 'BLAH3',
  name: 'PLAYLIST_3',
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

const COMMENTS = {
  BLAH: {'01': `BLAH1`},
  BLAH2: {'01': `BLAH2`},
  BLAH3: {'01': `BLAH3`},
}


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
      resolve({
        ...PLAYLIST,
        id: playlistId,
      });
    }, 1000)
  });
};

export function getComments (playlistId) {
  const abortController = new AbortController();
  const signal = abortController.signal;

  const payload = new Promise(async (resolve, reject) => {
    await fetch('www.google.com', {signal});
    setTimeout(() => {
      resolve(COMMENTS[playlistId]);
    }, 500)
  });

  return {
    payload,
    // need to bind as the `abort` function depends on some prototype stuff
    abort: abortController.abort.bind(abortController),
  };
};

export function saveComments (comments) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 500)
  });
};