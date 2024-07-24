// src/components/AudioGuide.js
import React, { useState } from 'react';

const AudioGuide = ({ src, title }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = React.createRef();

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={togglePlay}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioGuide;
