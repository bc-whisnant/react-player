import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  // ref
  // add ref for audio element
  const audioRef = useRef(null);
  // event handlers
  const playSongHandler = () => {
    // we need to do audio.play() --> but how can we access an html element in this function?
    //we can use refs with useRef
    // add ref for audio element
    console.log(audioRef);
    // audioRef.current.play()
    // play and pause
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    // update the times with every second of the song that passes
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // formatting is really odd here
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({...songInfo, currentTime: e.target.value})
  };

  // state --> this is the only place we will use it so it is declared here
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const autoPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.play()
    }
  }
  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type='range'
        />
        <p>{getTime(songInfo.duration) || 0}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft} />
        <FontAwesomeIcon
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          className='skip-forward'
          size='2x'
          icon={faAngleRight}
        />
      </div>
      {/* onloadedmetadata is used here so we can update the times when the page loads */}
      <audio
        onLoadedData={ autoPlayHandler }
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
