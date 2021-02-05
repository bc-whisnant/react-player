import { useState } from 'react'
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'
// import styles
import './styles/app.scss'
// import data
import data from './util'

function App() {
  // state
  const [songs, setSongs] = useState(data())

  const [currentSong, setCurrentSong] = useState(songs[0])

  const [isPlaying, setIsPlaying] = useState(false)

  const [libraryStatus, setLibraryStatus] = useState(false)

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}  />
      <Song currentSong={currentSong} />
      <Player songs={songs} currentSong={ currentSong } setCurrentSong={ setCurrentSong } setSongs={setSongs} isPlaying={ isPlaying } setIsPlaying={ setIsPlaying }/>
      <Library songs={songs} setCurrentSong={ setCurrentSong } setSongs={setSongs} libraryStatus={libraryStatus} />
    </div>
  );
}

export default App;
