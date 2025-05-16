import React, { useState, useEffect } from "react";
import "./Navbar.css"; 
import logo from "../assets/logo.svg";
import BookDemoForm from "./BookDemoForm";

const Navbar = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu') && 
          !event.target.closest('.hamburger-menu')) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);
  
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="navbar">
        <div className="navbar-section left">
          <button className="book-btn" onClick={openForm}>
            <span className="book-btn-text">Book A Demo</span>
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9.5 19.5l7-7-7-7"></path>
            </svg>
          </button>

          <div className="navbar-section right desktop-only">
            <div className="contact-info">
              <div className="contact-item">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
                  <path fill="white" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path>
                </svg> <a href="tel:+918081638914">+91 80816 38914</a>
              </div>
              <div className="contact-item">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="contact-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path>
                </svg> <a href="mailto:contactus@a2developers.org">contactus@a2developers.org</a>
              </div>
            </div>
          </div>
          
          <div className="hamburger-menu" onClick={toggleMobileMenu}>
            <div className={`hamburger-icon ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="navbar-menu">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <span className="logo-text">A2 Developers</span>
          </div>
          
          <div className="navbar-menu1 desktop-only">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#product">Product</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#product" onClick={() => setMobileMenuOpen(false)}>Product</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
        
        <div className="mobile-contact-info">
          <div className="contact-item">
            📞 <a href="tel:+918081638914">+91 80816 38914</a>
          </div>
          <div className="contact-item">
            📧 <a href="mailto:contactus@a2developers.org">contactus@a2developers.org</a>
          </div>
          
        </div>
      </div>

      <BookDemoForm isOpen={isFormOpen} onClose={closeForm} />
    </>
  );
};

export default Navbar;