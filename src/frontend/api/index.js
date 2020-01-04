/* global ENV */

// need to add this for pact testing, which are run on (bare) node
// rather than jsdom or some browser simulator.
// This should have no effect on the app itself, as fetch exists on the
// window already and wont be polyfilled.
import 'isomorphic-fetch';

export async function getPlaylists() {
  const response = await fetch(`${ENV.API_URL}/playlists`, {
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
  const response = await fetch(`${ENV.API_URL}/playlist/${playlistId}`, {
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
  const response = await fetch(`${ENV.API_URL}/comments/${playlistId}`, {
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
  return fetch(`${ENV.API_URL}/comments/${playlistId}`, {
    method: 'PUT',
    body: JSON.stringify(comments),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
}
