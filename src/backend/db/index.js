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
  getUser,
  saveUser,
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
  return writeFile(
    `${__dirname}/data/playlist/${playlistId}.json`,
    JSON.stringify(getPlaylist(playlist), undefined, 2),
  );
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
  return writeFile(
    `${__dirname}/data/comments/${playlistId}.json`,
    JSON.stringify(comments, undefined, 2),
  );
}

/**
 *
 */
async function getUser() {}

/**
 *
 */
async function saveUser() {}
