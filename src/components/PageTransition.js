
// src/components/PageTransition.js
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import './PageTransition.css'; // Ensure this file includes the transition styles

const PageTransition = ({ children }) => {
  const location = useLocation();
  
  // List of paths that should not have animations
  const noTransitionPaths = ['/'];

  // Determine whether the current path should have animation
  const shouldAnimate = !noTransitionPaths.includes(location.pathname);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={500} // Duration of the transition
        classNames={shouldAnimate ? 'fade-slide' : ''}
        unmountOnExit
      >
        <div>
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
