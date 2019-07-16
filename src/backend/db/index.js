const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

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
  return JSON.parse(
    await readFile(`${__dirname}/data/playlist/${playlistId}.json`, 'utf-8'),
  );
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
  return JSON.parse(
    await readFile(`${__dirname}/data/playlists/data.json`, 'utf-8'),
  );
}

/**
 *
 */
async function getComments(playlistId) {
  return JSON.parse(
    await readFile(`${__dirname}/data/comments/${playlistId}.json`, 'utf-8'),
  );
}

/**
 *
 */
async function saveComments(playlistId, comments) {
  //
}
