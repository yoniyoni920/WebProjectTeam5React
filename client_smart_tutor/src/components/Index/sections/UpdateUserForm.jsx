import React, { useState, useEffect } from 'react';

const UpdateUserForm = () => {
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [formData, setFormData] = useState({
    username: storedUser?.username || '',
    email: storedUser?.email || '',
    password: storedUser?.password || ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const username = JSON.parse(localStorage.getItem("loggedInUser"))?.username;
        const response = await fetch(`/api/update?username=${username}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });



      const result = await response.json();
      if (response.ok) {
        alert('User updated successfully!');
        localStorage.setItem("loggedInUser", JSON.stringify(formData));
      } else {
        alert(result.message || 'Failed to update user');
      }
    } catch (err) {
      console.error("Update error:", err);
      alert('Error updating user');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 font-semibold">Update Your Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-300">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-300">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Update Info
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
