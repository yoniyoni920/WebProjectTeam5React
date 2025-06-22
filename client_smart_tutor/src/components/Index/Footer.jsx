import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => (
  <footer className="text-gray-400 text-center py-4 mt-12 flex flex-col items-center justify-center">
    <div className="border-t border-gray-300 w-full mb-4 pt-4"></div>
    <div className="flex justify-between items-center w-full px-4 max-w-4xl">
      <p className="mr-4">&copy; 2025 TALKWISE. All rights reserved.</p>
      <div className="flex space-x-4">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition-colors duration-300 text-xl"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-white transition-colors duration-300 text-xl"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-pink-500 transition-colors duration-300 text-xl"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
