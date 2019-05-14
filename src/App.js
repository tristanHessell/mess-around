import React, {useState} from 'react';

import Playlist from './Playlist';

const PLAYLIST = {
  id: '',
  name: 'PLAYLIST NAME',
  description: 'hello description is me',
  comments: {'01': 'badas'},
  songs: [{
    id: '01',
    artists: ['Gus Dapperton', 'Miley Cyrus'],
    name: 'Hello name',
  }, {
    id: '02',
    artists: ['Gus Dapperton', 'Miley Cyrus'],
    name: 'Hello name',
  }],
};

function App() {
  const [playlist] = useState(PLAYLIST);
  const [comments, setComments] = useState(PLAYLIST.comments);

  const onClickSave = ({changes}) => {
    setComments({
      ...comments,
      ...changes,
    });
  };

  return (
    <div>
      <Playlist
        id={playlist.id}
        name={playlist.name}
        description={playlist.description}
        comments={comments}
        songs={playlist.songs}
        onSaveComments={onClickSave}
      />
    </div>
  );
}

export default App;
