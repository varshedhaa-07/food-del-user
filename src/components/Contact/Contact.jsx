// Contact.jsx
import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div id="contact" className="contact-container">
      <h1 className="contact-heading">Get in Touch</h1>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
