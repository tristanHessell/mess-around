import React, { useContext } from 'react';
import { List, AutoSizer } from 'react-virtualized';

import ReadOnlyContext from '../../ReadOnlyContext';
import Song from '../Song';
import Button from '../Button';

import { SongRow, PlaylistWrapper, AutoSizerWrapper } from './styles';

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
        <SongRow key={song.id} style={style}>
          <Song
            song={song}
            onChangeComment={onChangeComment}
            comment={comment}
            hasChanged={hasChanged}
            onClick={() => onClickSong(song.id)}
            readOnly={readOnly}
            onSave={onSaveSong}
          />
        </SongRow>
      );
    }

    return (
      <PlaylistWrapper>
        <AutoSizerWrapper>
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
        </AutoSizerWrapper>
        {!readOnly && (
          <Button
            testIdentifier="save-all-button"
            disabled={!Object.keys(comments.changes).length}
            onClick={() => onSaveSong()}
          >
            Save All
          </Button>
        )}
      </PlaylistWrapper>
    );
  },
);

PlaylistList.displayName = 'PlaylistList';

export default PlaylistList;
