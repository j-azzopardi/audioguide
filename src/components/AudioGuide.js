
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AudioGuide.css';
import InteractiveMap from './InteractiveMap';
import CustomAudioPlayer from './AudioPlayer';
import { FaMap, FaList } from 'react-icons/fa';

const stops = [
  {
    id: 1,
    title: 'Introduction',
    src: { 
      en: '/audio/en/intro_en.mp3',
      it: '/audio/it/intro_it.mp3',
    },
    transcriptPaths: {
      en: '/transcripts/en/intro.txt',
      it: '/transcripts/intro_transcript_it.txt',
    },
  },
  {
    id: 2,
    title: '1 - The Ottoman - Royalty at the Black Friars',
    src: { en: '/audio/en/experience1_en.mp3', it: '/audio/it/audio2_it.mp3' },
    image: '/images/exp1.jpg',
    transcriptPaths: {
      en: '/transcripts/en/exp1.txt',
      it: '/transcripts/audio2_transcript_it.txt',
    },
  },
  // Add more stops as needed
];

const AudioGuide = () => {
  const { language } = useParams(); // Get the language from URL params
  const [currentStopIndex, setCurrentStopIndex] = useState(null);
  const [view, setView] = useState('cards');
  const [autoPlay, setAutoPlay] = useState(false);
  const [transcript, setTranscript] = useState('');
  const navigate = useNavigate();

  const currentStop = currentStopIndex !== null ? stops[currentStopIndex] : null;

  // Fetch the transcript when the currentStop or language changes
  useEffect(() => {
    if (currentStop && currentStop.transcriptPaths) {
      const transcriptPath = currentStop.transcriptPaths[language] || currentStop.transcriptPaths['en']; // Fallback to English if language is not available
      fetch(transcriptPath)
        .then((response) => response.text())
        .then((text) => setTranscript(text))
        .catch((error) => console.error('Error loading transcript:', error));
    }
  }, [currentStop, language]); // Update when stop or language changes

  const handleStopClick = (index) => {
    setCurrentStopIndex(index);
    setAutoPlay(true);
  };

  const handleNextStop = () => {
    if (currentStopIndex < stops.length - 1) {
      setCurrentStopIndex(currentStopIndex + 1);
      setAutoPlay(true);
    }
  };

  const handlePreviousStop = () => {
    if (currentStopIndex > 0) {
      setCurrentStopIndex(currentStopIndex - 1);
      setAutoPlay(true);
    }
  };

  const handleMapClick = (stopId) => {
    const stopIndex = stops.findIndex((stop) => stop.id === stopId);
    if (stopIndex !== -1) {
      setCurrentStopIndex(stopIndex);
      setView('cards');
      setAutoPlay(true);
    }
  };

  return (
    <div className="audio-guide-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      {/* View Toggle Button */}
      <button className="view-toggle-button" onClick={() => setView(view === 'cards' ? 'map' : 'cards')}>
        {view === 'cards' ? <FaMap /> : <FaList />}
      </button>

      {/* Stop Cards Section */}
      <div className={`transition-section ${view === 'cards' ? 'active' : ''}`}>
        <div className="stops-section">
          {stops.map((stop, index) => (
            <div key={stop.id} className="stop-card" onClick={() => handleStopClick(index)}>
              <h3>{stop.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className={`transition-section ${view === 'map' ? 'active' : ''}`}>
        <div className="map-container">
          <InteractiveMap onAreaClick={handleMapClick} />
        </div>
      </div>

      {/* Audio Player */}
      {currentStop && (
        <CustomAudioPlayer
          currentTrack={{
            title: currentStop.title,
            src: currentStop.src[language], // Play the audio for the selected language
            image: currentStop.image,
            transcript, // The fetched transcript based on the selected language
          }}
          onNext={handleNextStop}
          onPrevious={handlePreviousStop}
          autoPlay={autoPlay}
        />
      )}
    </div>
  );
};

export default AudioGuide;
