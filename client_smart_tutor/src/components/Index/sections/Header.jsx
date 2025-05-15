import React from 'react';

const Header = ({ onLoginClick, onSignupClick, onNavigate }) => (
  <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white px-8 py-4 shadow-md z-50 flex flex-col md:flex-row items-center justify-between">
    <div className="text-2xl font-bold mb-4 md:mb-0">Smart Tutor</div>

    <nav className="mb-4 md:mb-0">
      <ul className="flex space-x-6">
        <li>
          <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition focus:outline-none">Home</button>
        </li>
        <li>
          <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition focus:outline-none">About</button>
        </li>
        <li>
          <button onClick={() => onNavigate('services')} className="hover:text-blue-400 transition focus:outline-none">Services</button>
        </li>
        <li>
          <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition focus:outline-none">Contact</button>
        </li>
      </ul>
    </nav>

    <div className="flex space-x-4">
      <button onClick={onLoginClick} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition">Log In</button>
      <button onClick={onSignupClick} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded">Sign Up</button>
    </div>
  </header>
);

export default Header;
