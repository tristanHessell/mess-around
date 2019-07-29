// need to add this for pact testing, which are run on (bare) node
// rather than jsdom or some browser simulator.
// This should have no effect on the app itself, as fetch exists on the
// window already and wont be polyfilled.
import 'isomorphic-fetch';

export function getPlaylists() {
  return fetch('http://localhost:5000/playlists').then((response) =>
    response.json(),
  );
}

export function getPlaylist(playlistId) {
  return fetch(`http://localhost:5000/playlist/${playlistId}`).then(
    (response) => response.json(),
  );
}

export function getComments(playlistId) {
  return fetch(`http://localhost:5000/comments/${playlistId}`).then(
    (response) => response.json(),
  );
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
