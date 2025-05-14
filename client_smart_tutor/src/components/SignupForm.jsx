import React, { useState, useRef } from 'react';
import Captcha from './Captcha';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirm: '',
  });

  const captchaRef = useRef(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm) {
      alert("Passwords do not match!");
      return;
    }

    const captchaPassed = captchaRef.current.validate();
    if (!captchaPassed) {
      alert("Captcha incorrect. Please try again.");
      return;
    }

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-6 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold text-white text-center">Sign Up</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-xl"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-xl"
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-xl"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-xl"
      />

      <input
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        value={formData.confirm}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-xl"
      />

      <Captcha ref={captchaRef} />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
        Register
      </button>
    </form>
  );
}
