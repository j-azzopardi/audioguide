import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AudioGuide.css';

const stops = [
  { id: 1, title: 'Stop 1', src: { en: '/audio/en/audio1_en.mp3', it: '/audio/it/audio1_it.mp3' }, image: 'path/to/image1.jpg' },
  { id: 2, title: 'Stop 2', src: { en: '/audio/en/audio2_en.mp3', it: '/audio/it/audio2_it.mp3' }, image: 'path/to/image2.jpg' },
  // Add more stops with language-specific audio files
];

const AudioGuide = () => {
  const { language } = useParams();
  const [currentStopIndex, setCurrentStopIndex] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const navigate = useNavigate();

  const currentStop = stops[currentStopIndex];

  const handleStopClick = (index) => {
    if (index === currentStopIndex) {
      togglePlay(); // Toggle play/pause if the same stop is clicked
    } else {
      setCurrentStopIndex(index);
      setPlaying(true);
      setCurrentTime(0); // Reset currentTime when changing to a new track
    }
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
    setCurrentTime(newValue); // Update state for progress bar
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (currentStopIndex !== null) {
      audioRef.current.src = currentStop.src[language];
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
        progressRef.current.max = audioRef.current.duration;
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [language, currentStopIndex, playing]);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.value = currentTime;
    }
  }, [currentTime]);

  const handleNextStop = () => {
    if (currentStopIndex < stops.length - 1) {
      setCurrentStopIndex(currentStopIndex + 1);
      setCurrentTime(0); // Reset currentTime on track change
      setPlaying(true);
    }
  };

  const handlePreviousStop = () => {
    if (currentStopIndex > 0) {
      setCurrentStopIndex(currentStopIndex - 1);
      setCurrentTime(0); // Reset currentTime on track change
      setPlaying(true);
    }
  };

  return (
    <div className="audio-guide-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <div className="stops-section">
        {stops.map((stop, index) => (
          <div
            key={stop.id}
            className="stop-card"
            onClick={() => handleStopClick(index)}
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
            <button className="control-button" onClick={handlePreviousStop}>
              <i className="fas fa-step-backward" aria-hidden="true"></i>
            </button>
            <button className="control-button" onClick={togglePlay}>
              <i className={playing ? "fas fa-pause" : "fas fa-play"} aria-hidden="true"></i>
            </button>
            <button className="control-button" onClick={handleNextStop}>
              <i className="fas fa-step-forward" aria-hidden="true"></i>
            </button>
          </div>
          <div className="progress">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime || 0}
              onChange={handleProgressChange}
              ref={progressRef}
            />
            <span>{formatTime(currentTime || 0)} / {formatTime(duration || 0)}</span>
          </div>
        </div>
      )}
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioGuide;

