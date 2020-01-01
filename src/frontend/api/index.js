// need to add this for pact testing, which are run on (bare) node
// rather than jsdom or some browser simulator.
// This should have no effect on the app itself, as fetch exists on the
// window already and wont be polyfilled.
import 'isomorphic-fetch';

export async function getPlaylists() {
  const response = await fetch('http://localhost:5000/playlists', {
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error();
}

export async function getPlaylist(playlistId) {
  const response = await fetch(`http://localhost:5000/playlist/${playlistId}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error();
}

export async function getComments(playlistId) {
  const response = await fetch(`http://localhost:5000/comments/${playlistId}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error();
}

export function saveComments(playlistId, comments) {
  return fetch(`http://localhost:5000/comments/${playlistId}`, {
    method: 'PUT',
    body: JSON.stringify(comments),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
}
