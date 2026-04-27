import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import BlogList from './components/BlogList';
import './App.css';

function App() {
  const [view, setView] = useState('hero');
  const [displayView, setDisplayView] = useState('hero');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (view !== displayView) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayView(view);
        setIsTransitioning(false);
      }, 600); // Matches the slow transition duration
      return () => clearTimeout(timer);
    }
  }, [view, displayView]);

  return (
    <main className="app-main">
      <div className={`view-container ${isTransitioning ? 'view-exit-active' : 'view-enter-active'}`}>
        {displayView === 'hero' ? (
          <Hero onViewBlogs={() => setView('blogs')} />
        ) : (
          <BlogList onBack={() => setView('hero')} />
        )}
      </div>
    </main>
  );
}

export default App;
