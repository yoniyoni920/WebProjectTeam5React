import React, { useState } from 'react';

const LoginModel = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', message: 'Login successful! Redirecting...' });
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        setTimeout(() => {
          window.location.href = "index.html"; 
        }, 1000);
      } else {
        setStatus({ type: 'error', message: data.error || 'InCorrect username or password' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-lg w-80 p-6 relative text-white">
        <h2 className="text-2xl mb-6 text-center font-semibold">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="loginUsername" className="block mb-1 text-gray-300 font-medium">
              Username:
            </label>
            <input
              type="text"
              id="loginUsername"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="loginPassword" className="block mb-1 text-gray-300 font-medium">
              Password:
            </label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Log In
          </button>

          {status.message && (
            <div
              className={`text-sm mt-2 ${
                status.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModel;
