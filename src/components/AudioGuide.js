// src/components/AudioGuide.js
import React, { useState, useRef } from 'react';
import './AudioGuide.css'; // Ensure this is the correct path to your CSS file

const stops = [
  { id: 1, title: 'Stop 1', src: 'path/to/audio1.mp3', image: 'path/to/image1.jpg' },
  { id: 2, title: 'Stop 2', src: 'path/to/audio2.mp3', image: 'path/to/image2.jpg' },
  { id: 3, title: 'Stop 3', src: 'path/to/audio3.mp3', image: 'path/to/image3.jpg' },
  { id: 4, title: 'Stop 4', src: 'path/to/audio4.mp3', image: 'path/to/image4.jpg' },
  { id: 5, title: 'Stop 5', src: 'path/to/audio5.mp3', image: 'path/to/image5.jpg' },
  { id: 6, title: 'Stop 6', src: 'path/to/audio6.mp3', image: 'path/to/image6.jpg' },
  { id: 7, title: 'Stop 7', src: 'path/to/audio7.mp3', image: 'path/to/image7.jpg' },
  { id: 8, title: 'Stop 8', src: 'path/to/audio8.mp3', image: 'path/to/image8.jpg' },
  { id: 9, title: 'Stop 9', src: 'path/to/audio9.mp3', image: 'path/to/image9.jpg' },
  { id: 10, title: 'Stop 10', src: 'path/to/audio10.mp3', image: 'path/to/image10.jpg' },
];

const AudioGuide = () => {
  const [currentStop, setCurrentStop] = useState(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const handleStopClick = (stop) => {
    setCurrentStop(stop);
    setPlaying(true);
    audioRef.current.src = stop.src;
    audioRef.current.play();
  };

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleProgressChange = (event) => {
    const newValue = event.target.value;
    audioRef.current.currentTime = newValue;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="audio-guide-container">
      <div className="stops-section">
        {stops.map((stop) => (
          <div
            key={stop.id}
            className="stop-card"
            onClick={() => handleStopClick(stop)}
          >
            <img src={stop.image} alt={stop.title} />
            <h3>{stop.title}</h3>
          </div>
        ))}
      </div>
      
      {currentStop && (
        <div className="audio-player">
          <div className="player-info">
            <div className="player-details">
              <h3 className="player-title">{currentStop.title}</h3>
            </div>
          </div>
          <div className="controls">
            <button className="control-button" onClick={() => audioRef.current.currentTime -= 10}>
              <i className="fas fa-step-backward" aria-hidden="true"></i>
            </button>
            <button className="control-button" onClick={togglePlay}>
              <i className={playing ? "fas fa-pause" : "fas fa-play"} aria-hidden="true"></i>
            </button>
            <button className="control-button" onClick={() => audioRef.current.currentTime += 10}>
              <i className="fas fa-step-forward" aria-hidden="true"></i>
            </button>
          </div>
          <div className="progress">
            <input
              type="range"
              min="0"
              max={audioRef.current?.duration || 0}
              value={audioRef.current?.currentTime || 0}
              onChange={handleProgressChange}
              ref={progressRef}
            />
            <span>{formatTime(audioRef.current?.currentTime || 0)} / {formatTime(audioRef.current?.duration || 0)}</span>
          </div>
        </div>
      )}
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioGuide;

