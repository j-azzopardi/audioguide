
import React, { useState, useRef, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioPlayer.css';
import { FaClosedCaptioning } from 'react-icons/fa'; // Import a closed captions icon

const CustomAudioPlayer = ({ currentTrack, onNext, onPrevious, autoPlay }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const audioPlayerRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (autoPlay && audioPlayerRef.current) {
      audioPlayerRef.current.audio.current.play();
    }
  }, [autoPlay, currentTrack.src]);

  return (
    <div className={`audio-player-wrapper ${isExpanded ? 'expanded' : ''}`}>
      <div className="audio-player">
        <div className="track-info">
          <span className="track-title">{currentTrack.title}</span>
          {currentTrack.transcript && (
            <FaClosedCaptioning
              className="closed-captions-icon"
              onClick={toggleExpand}
            />
          )}
        </div>
        <AudioPlayer
          ref={audioPlayerRef}
          src={currentTrack.src}
          onPlay={() => console.log('Playing')}
          onClickPrevious={onPrevious}
          onClickNext={onNext}
          onEnded={onNext}
          showSkipControls
          showJumpControls={false}
        />
        {isExpanded && (
          <div className="transcript">
            <h4>Transcript</h4>
            <p>{currentTrack.transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
