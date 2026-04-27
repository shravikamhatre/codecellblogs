import React from 'react';
import AsciiInfinity from './AsciiInfinity';
import MotionButton from './MotionButton';
import './Hero.css';

const Hero = ({ onViewBlogs }) => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <AsciiInfinity />
        <div className="hero-bottom">
          <p className="hero-label">
            <span className="font-saol">code</span>
            <span className="font-newedge">cell</span>
          </p>
          <div className="mt-8">
            <MotionButton label="View Blogs" onClick={onViewBlogs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
