import React, { useState, useRef } from 'react';
import Captcha from './Captcha';

export default function SignupForm({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirm: '',
  });

  const [showCaptcha, setShowCaptcha] = useState(false);
  const captchaRef = useRef(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      alert("Passwords do not match!");
      return;
    }
    // Show captcha modal instead of submitting now
    setShowCaptcha(true);
  };

  // Called after captcha is solved successfully
  const handleCaptchaSuccess = () => {
    const captchaPassed = captchaRef.current.validate();
    if (!captchaPassed) {
      alert("Captcha incorrect. Please try again.");
      return;
    }
    setShowCaptcha(false);

    // Now submit the form data to backend
    submitForm();
  };

  const submitForm = async () => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration successful!');
        localStorage.setItem("loggedInUser", JSON.stringify(formData));
        window.location.href = "main.html";
      } else {
        alert('Failed to register user.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full mx-auto text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg w-80 p-6 relative space-y-4">
        <h2 className="text-2xl font-semibold text-white text-center">Sign Up</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border"
        />

        <input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          value={formData.confirm}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-xl border"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
          Register
        </button>
      </form>
    </div>
      {showCaptcha && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg relative">
            <button
              onClick={() => setShowCaptcha(false)}
              className="absolute top-2 right-3 text-gray-700 font-bold text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl mb-4 font-semibold">Please verify you're human</h3>
            <Captcha ref={captchaRef} />
            <button
              onClick={handleCaptchaSuccess}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Verify & Register
            </button>
          </div>
        </div>
      )}
    </>
  );
}
