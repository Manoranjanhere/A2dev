import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const backgroundVideos = [
    "/video1.mp4",
    "/video2.mp4", 
    "/video3.mp4"  
  ];

  return (
    <div className="app-container">
      {backgroundVideos.map((video, index) => (
        <video 
          key={video}
          className={`background-video ${currentSlide === index ? 'active' : ''}`}
          autoPlay 
          loop 
          muted
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}

      <Navbar />
      <Hero currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
    </div>
  );
}

export default App;