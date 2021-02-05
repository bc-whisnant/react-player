import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, currentSong, setSongs, libraryStatus, setLibraryStatus }) => {
  const toggleLibrary = () => {
    setLibraryStatus(!libraryStatus)
  }

  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`} >
      <div className="library-menu">
      <h2 onClick={toggleLibrary}>X</h2>
      </div>
      <div className='library-songs'>
        {songs.map((song) => (
          <LibrarySong
            song={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            key={song.id}
            id={song.id}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
