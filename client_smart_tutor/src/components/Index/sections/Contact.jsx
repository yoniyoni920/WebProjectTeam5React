import React from 'react';

const Contact = () => (
  <section id="contact" className="py-12 bg-gray-800 rounded-lg shadow-md px-6 max-w-lg mx-auto">
    <h2 className="text-3xl font-semibold mb-6 text-white">Contact Us</h2>
    <form action="#" method="post" className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium mb-1 text-gray-300">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-medium mb-1 text-gray-300">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-medium mb-1 text-gray-300">Message:</label>
        <textarea
          id="message"
          name="message"
          required
          className="w-full border border-gray-600 rounded px-3 py-2 h-32 resize-none bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
      >
        Send
      </button>
    </form>
  </section>
);

export default Contact;
