import React from "react";
import "./About.css";

const About = () => {
  return (
    <div id="about" className="about-container">
      <h1 className="about-heading">About Us</h1>
      <div className="about-content">
        <div className="about-left">
          <video className="about-video" controls>
            <source src="vd1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="about-right">
          <p>
            Welcome to Foodie's Paradise, where we bring the world of flavors to
            your fingertips. Our mission is to make food ordering seamless and
            enjoyable for everyone. With a wide variety of cuisines, curated
            menus, and quick delivery, we ensure your cravings are always
            satisfied.
          </p>
          <p>
            Whether you're looking for a hearty meal or a quick snack, we've got
            you covered. Join us in our journey to redefine the way you enjoy
            food, one delicious bite at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
