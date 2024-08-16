
// src/components/InteractiveMap.js
import React, { useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Map from '../assets/map.svg'; // Import your SVG file
import './InteractiveMap.css'; // Ensure to import the CSS file

const InteractiveMap = ({ onAreaClick }) => {
  const transformWrapperRef = useRef(null);

  const handleZoomIn = () => {
    transformWrapperRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    transformWrapperRef.current.zoomOut();
  };

  const handleResetZoom = () => {
    transformWrapperRef.current.resetTransform();
  };

  const handleAreaClick = (stopId) => {
    if (onAreaClick) {
      onAreaClick(stopId);
    }
  };

  return (
    <div className="map-container">
      <TransformWrapper
        ref={transformWrapperRef}
        defaultScale={2} // Adjust initial zoom level
        defaultPositionX={-200} // Adjust initial horizontal position
        defaultPositionY={-100} // Adjust initial vertical position
        wheel={{ disabled: false }} // Enable zooming with mouse wheel
      >
        <TransformComponent>
          <div className="map-wrapper">
            <img src={Map} alt="Interactive Map" useMap="#map" />
            <map name="map">
              <area
                shape="circle"
                coords="50,50,20" // Update these coords based on your map
                href="#"
                onClick={() => handleAreaClick(1)}
                alt="Stop 1"
              />
              <area
                shape="circle"
                coords="150,150,20" // Update these coords based on your map
                href="#"
                onClick={() => handleAreaClick(2)}
                alt="Stop 2"
              />
              {/* Add more areas for other stops */}
            </map>
          </div>
        </TransformComponent>
      </TransformWrapper>
      <div className="zoom-controls">
        <button className="zoom-in-button" onClick={handleZoomIn}>
          +
        </button>
        <button className="zoom-out-button" onClick={handleZoomOut}>
          -
        </button>
        <button className="reset-button" onClick={handleResetZoom}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default InteractiveMap;
