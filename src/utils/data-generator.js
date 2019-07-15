'use strict';
/*eslint-env node */

module.exports = {
  generatePlaylist,
  generateComments,
  generateSongs,
  generateSong,
};

/**
 * Creates a playlist object including the songs.
 *
 * Strictly for use only in testing.
 *
 * @param {*} id The id of the newly generated playlist, or a new one will be created if falsy
 * @param {*} numSongs The number of songs in the newly generated playlist
 */
function generatePlaylist(id, numSongs) {
  return {
    id,
    name: `Playlist ${id}`,
    description: `Description for ${id}`,
    songs: generateSongs(numSongs),
  };
}

/**
 * Creates a comments set (as a POJO), based off of the specified playlist.
 *
 * Strictly for use only in testing.
 *
 * @param {*} playlist A playlist object
 */
function generateComments(playlist) {
  return playlist.songs.reduce((comments, song) => {
    comments[song.id] = `Comment for song ${song.id}`;
    return comments;
  }, {});
}

/**
 * Creates an array of songs objects, of the specified size.
 *
 * Strictly for use only in testing.
 *
 * @param {*} num the number of songs to generate
 */
function generateSongs(num) {
  const songs = [];

  for (let i = 0; i < num; i++) {
    songs.push(generateSong(i));
  }

  return songs;
}

/**
 * Generates a song objects.
 *
 * Strictly for use only in testing.
 *
 */
function generateSong(id) {
  return {
    id,
    name: `The song ${id}`,
    artists: [
      {
        name: 'The Artist',
      },
    ],
  };
}
