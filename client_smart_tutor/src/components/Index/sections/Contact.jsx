import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(result.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('Error sending message.');
    }
  };

  return (
    <section id="contact" className="contact-section py-14 rounded-3xl shadow-xl px-8 max-w-xl mx-auto border my-12">

      <h2 className="text-3xl font-bold mb-8 text-[#333446] text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-semibold mb-2 text-[#7F8CAA] text-lg">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-[#7F8CAA] rounded-lg px-4 py-3 bg-white text-[#333446] focus:outline-none focus:ring-2 focus:ring-[#7F8CAA] text-lg"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold mb-2 text-[#7F8CAA] text-lg">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#7F8CAA] rounded-lg px-4 py-3 bg-white text-[#333446] focus:outline-none focus:ring-2 focus:ring-[#7F8CAA] text-lg"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-semibold mb-2 text-[#7F8CAA] text-lg">Message:</label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-[#7F8CAA] rounded-lg px-4 py-3 h-32 resize-none bg-white text-[#333446] focus:outline-none focus:ring-2 focus:ring-[#7F8CAA] text-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-[#7F8CAA] hover:bg-[#6a7899] text-white font-bold px-8 py-3 rounded-xl text-lg shadow-md transition-all duration-200 w-full"
        >
          Send
        </button>
        {status && <p className="text-base text-[#7F8CAA] mt-2 text-center">{status}</p>}
      </form>
    </section>
  );
};

export default Contact;
