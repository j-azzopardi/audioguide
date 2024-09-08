
import React, { useState, useRef, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './AudioPlayer.css';
import { FaClosedCaptioning, FaTimes } from 'react-icons/fa'; // Import FaTimes for the close button

const CustomAudioPlayer = ({ currentTrack, onNext, onPrevious }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const audioPlayerRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audio.current.play();
    }
  }, [currentTrack.src]);

  return (
    <div className={`audio-player-wrapper ${isExpanded ? 'expanded' : ''}`}>
      <div className="audio-player">
        <div className="track-info" onClick={toggleExpand}>
          <span className="track-title">{currentTrack.title}</span>
          {currentTrack.transcript && (
            // Conditionally render FaClosedCaptioning or FaTimes based on isExpanded state
            isExpanded ? (
              <FaTimes className="close-icon" />
            ) : (
              <FaClosedCaptioning className="closed-captions-icon" />
            )
          )}
        </div>

        {isExpanded && currentTrack.image && (
          <div className="image-container">
            <img src={currentTrack.image} alt="Track" className="track-image" />
          </div>
        )}

        <AudioPlayer
          ref={audioPlayerRef}
          src={currentTrack.src}
          onPlay={() => console.log('Playing')}
          onClickPrevious={onPrevious}
          onClickNext={onNext}
          onEnded={() => console.log('Track ended, not autoplaying next track')}
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
