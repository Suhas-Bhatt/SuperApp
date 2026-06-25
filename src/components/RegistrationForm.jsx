import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const RegistrationForm = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    const usernamePattern = /^[a-zA-Z0-9_-]+$/;
    const namePattern = /^[a-zA-Z\s]+$/;

    if (!formData.name.trim()) {
      tempErrors.name = 'Name field cannot be left blank.';
    } else if (!namePattern.test(formData.name)) {
      tempErrors.name = 'Name must contain only letters and spaces.';
    }

    if (!formData.username.trim()) {
      tempErrors.username = 'Username field cannot be left blank.';
    } else if (!usernamePattern.test(formData.username)) {
      tempErrors.username = 'Username must be alphanumeric (no spaces).';
    }

    if (!emailPattern.test(formData.email)) {
      tempErrors.email = 'Please input a valid email formatting schema.';
    }

    if (!phonePattern.test(formData.mobile)) {
      tempErrors.mobile = 'Mobile field must encompass exactly 10 digital characters.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setUser(formData);
      navigate('/categories');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative premium background glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500/25 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '3s' }} />

      <div className="card max-w-md w-full p-8 md:p-10 relative z-10 fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            The Super App
          </h1>
          <p className="text-gray-600 font-medium">Create your account to get started</p>
        </div>

        <form onSubmit={handleFormSubmission} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 pl-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-200' : ''}`}
              placeholder="John Doe"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 pl-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`input-field ${errors.username ? 'border-red-500 focus:ring-red-200' : ''}`}
              placeholder="johndoe123"
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 pl-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-200' : ''}`}
              placeholder="john@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 pl-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`input-field ${errors.mobile ? 'border-red-500 focus:ring-red-200' : ''}`}
              placeholder="9876543210"
              maxLength="10"
            />
            {errors.mobile && <span className="error-text">{errors.mobile}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full mt-8 py-3 text-base shadow-lg shadow-indigo-500/20">
            Submit Registration Details
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6 font-medium">
          Join thousands of users organizing their digital life
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
