import React, { useEffect } from "react";
import "./Hero.css";

const Hero = ({ currentSlide, setCurrentSlide }) => {
  const heroContents = [
    {
      heading: "All Your Information in One Place",
      subtext: "Simplify Management with a Unified Data Platform."
    },
    {
      heading: "Access Anytime, Anywhere",
      subtext: "Empowering You with Data on Demand Across Devices."
    },
    {
      heading: "Lower Costs, Higher Value",
      subtext: "Offering Premium Features at a Fraction of the Price."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroContents.length);
    }, 8000); 
    
    return () => clearInterval(interval);
  }, [setCurrentSlide, heroContents.length]);
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>{heroContents[currentSlide].heading}</h1>
        <p>{heroContents[currentSlide].subtext}</p>
      </div>

      <div className="slider-dots">
        {heroContents.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Hero;