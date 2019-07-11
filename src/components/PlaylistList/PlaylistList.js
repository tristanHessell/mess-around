import React, { useContext } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import styled from 'styled-components';

import ReadOnlyContext from '../../ReadOnlyContext';
import Song from '../Song';

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const RowContainer = styled.div`
  display: flex;
`;

// https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md#can-i-use-autosizer-within-a-flex-container
const AutoSizerContainer = styled.div`
  flex: 1 1 auto;
`;

const PlaylistList = React.memo(
  ({
    songs,
    comments,
    onSaveSong,
    onClickSong,
    onChangeComment,
    getComment,
  }) => {
    const readOnly = useContext(ReadOnlyContext);

    function rowRenderer({ index, style }) {
      const song = songs[index];
      const { comment, hasChanged } = getComment(song.id);

      return (
        <RowContainer key={song.id} style={style}>
          <Song
            songId={song.id}
            name={song.name}
            artists={song.artists}
            onChangeComment={onChangeComment}
            comment={comment}
            hasChanged={hasChanged}
            onClick={() => onClickSong(song.id)}
            readOnly={readOnly}
            onSave={onSaveSong}
          />
        </RowContainer>
      );
    }

    return (
      <PlaylistContainer>
        <AutoSizerContainer>
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                rowCount={songs.length}
                rowHeight={100} // TODO change this
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        </AutoSizerContainer>
        {!readOnly && (
          <button
            disabled={!Object.keys(comments.changes).length}
            onClick={() => onSaveSong()}
          >
            Save All
          </button>
        )}
      </PlaylistContainer>
    );
  },
);

PlaylistList.displayName = 'PlaylistList';

export default PlaylistList;
