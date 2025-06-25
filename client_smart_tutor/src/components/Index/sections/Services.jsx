import React from 'react';

const Services = () => (
  <section id="services" className=" article-card group border border-[#7F8CAA] rounded-3xl p-12 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 block shadow-xl">
    <h2 className="text-3xl font-bold mb-6" style={{ color: '#333446' }}>Our Services</h2>
    <p className="mb-4 text-gray-700 text-lg">
      <strong>TalkWise</strong> offers smart, user-friendly tools to help you learn English effectively and enjoyably:
    </p>
    <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2 inline-block text-left text-lg">
      <li><strong>Personalized Lessons:</strong> Tailored content based on your level and goals.</li>
      <li><strong>Real-Time Feedback:</strong> Instant tips on pronunciation and grammar.</li>
      <li><strong>AI Conversations:</strong> Practice with virtual characters in real-life scenarios.</li>
      <li><strong>Progress Tracking:</strong> See your improvement with clear stats and reports.</li>
      <li><strong>Anytime Access:</strong> Learn at your own pace, wherever you are.</li>
    </ul>
    <p className="text-gray-700 text-lg">We make English learning smart, simple, and flexible for everyone.</p>
  </section>
);

export default Services;
