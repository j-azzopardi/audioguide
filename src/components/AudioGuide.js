
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AudioGuide.css';
import InteractiveMap from './InteractiveMap';
import CustomAudioPlayer from './AudioPlayer'; // Import for the updated AudioPlayer component
import { FaMap, FaList } from 'react-icons/fa'; // Import icons

const stops = [
  {
    id: 1,
    title: 'Stop 1',
    src: { en: '/audio/en/audio1_en.mp3', it: '/audio/it/audio1_it.mp3' },
    image: 'path/to/image1.jpg',
    transcript: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 2,
    title: 'Stop 2',
    src: { en: '/audio/en/audio2_en.mp3', it: '/audio/it/audio2_it.mp3' },
    image: 'path/to/image2.jpg',
    transcript: 'This is the transcript for Stop 2.',
  },
  // Add more stops as needed
];

const AudioGuide = () => {
  const { language } = useParams();
  const [currentStopIndex, setCurrentStopIndex] = useState(null);
  const [view, setView] = useState('cards');
  const [autoPlay, setAutoPlay] = useState(false); // Add autoPlay state
  const navigate = useNavigate();

  const currentStop = currentStopIndex !== null ? stops[currentStopIndex] : null;

  const handleStopClick = (index) => {
    setCurrentStopIndex(index);
    setAutoPlay(true); // Set autoPlay to true when stop card is clicked
  };

  const handleNextStop = () => {
    if (currentStopIndex < stops.length - 1) {
      setCurrentStopIndex(currentStopIndex + 1);
      setAutoPlay(true); // Set autoPlay to true when navigating to the next stop
    }
  };

  const handlePreviousStop = () => {
    if (currentStopIndex > 0) {
      setCurrentStopIndex(currentStopIndex - 1);
      setAutoPlay(true); // Set autoPlay to true when navigating to the previous stop
    }
  };

  const handleMapClick = (stopId) => {
    const stopIndex = stops.findIndex((stop) => stop.id === stopId);
    if (stopIndex !== -1) {
      setCurrentStopIndex(stopIndex);
      setView('cards'); // Automatically switch to list view when a stop is selected from the map
      setAutoPlay(true); // Set autoPlay to true when stop is selected from the map
    }
  };

  return (
    <div className="audio-guide-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      {/* View Toggle Button */}
      <button
        className="view-toggle-button"
        onClick={() => setView(view === 'cards' ? 'map' : 'cards')}
      >
        {view === 'cards' ? <FaMap /> : <FaList />} {/* Use icons instead of text */}
      </button>

      {/* Stop Cards Section */}
      <div className={`transition-section ${view === 'cards' ? 'active' : ''}`}>
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
            src: currentStop.src[language],
            image: currentStop.image,
            transcript: currentStop.transcript,
          }}
          onNext={handleNextStop}
          onPrevious={handlePreviousStop}
          autoPlay={autoPlay} // Pass autoPlay prop to CustomAudioPlayer
        />
      )}
    </div>
  );
};

export default AudioGuide;
