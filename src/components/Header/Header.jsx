import React, { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import "./Header.css";

const Home = () => {
  const images = [
    "img1.jpeg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [images.length]);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div id="home" className="home-container">
      <div className="slider">
        <img
          src={images[currentImageIndex]}
          alt="Slideshow"
          className="slider-image"
        />
        <div className="next-button" onClick={handleNext}>
          <div className="icon-circle">
            <AiOutlineRight size={32} color="orange" />
          </div>
        </div>
      </div>
      <div className="overlay" >
        <h1 className="home-title">Welcome to Foodie's Paradise</h1>
        <p className="home-subtitle">Satisfy your cravings with just a few clicks!</p>
      </div>
    </div>
  );
};

export default Home;
