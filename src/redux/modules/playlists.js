export const GET_PLAYLISTS = 'spotify-list/playlists/GET_PLAYLISTS';
export const LOADING_PLAYLISTS = 'spotify-list/playlists/LOADING_PLAYLISTS';

const DEFAULT_PLAYLISTS = { canonical: {}, changes: {}, isSaving: false, isLoading: true};

export default function reducer (state = DEFAULT_PLAYLISTS, action) {
  switch(action.type) {
    case GET_PLAYLISTS: {
      return {
        ...state,
      };
    }
    case LOADING_PLAYLISTS: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
