import React, { useState } from 'react';
import './BookDemoForm.css';

const BookDemoForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    institutionName: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          contactNumber: '',
          institutionName: '',
          requirements: ''
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="form-modal-overlay">
      <div className="form-modal">
        <button className="close-button" onClick={onClose}>×</button>
        
        <h2>Get In Touch</h2>
        <p className="form-description">
          Have questions about our Products? Fill out the form below to get a call with us.
        </p>
        
        {submitStatus === 'success' ? (
          <div className="success-message">
            <h3>Thank you!</h3>
            <p>Your form has been submitted successfully. We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number *</label>
              <div className="phone-input">
                <div className="country-code">+91</div>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="institutionName">Institution Name *</label>
              <input
                type="text"
                id="institutionName"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                placeholder="Institution Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Requirements</label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Requirements"
                rows={4}
              />
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            
            {submitStatus === 'error' && (
              <p className="error-message">
                Something went wrong. Please try again later.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default BookDemoForm;