
// src/components/PageTransition.js
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

const PageTransition = ({ children }) => {
  const location = useLocation();
  
  // Paths without transition animations
  const noTransitionPaths = ['/'];

  // Determine if animation is needed
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
