import React from 'react';

const Services = () => (
  <section id="services" className="py-12 bg-transparent border border-gray-700 px-6 text-center">
    <h2 className="text-3xl font-semibold mb-4 text-white">Our Services</h2>
    <p className="mb-4 text-gray-300">
      <strong>TalkWise</strong> offers smart, user-friendly tools to help you learn English effectively and enjoyably:
    </p>
    <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2 inline-block text-left">
      <li><strong>Personalized Lessons:</strong> Tailored content based on your level and goals.</li>
      <li><strong>Real-Time Feedback:</strong> Instant tips on pronunciation and grammar.</li>
      <li><strong>AI Conversations:</strong> Practice with virtual characters in real-life scenarios.</li>
      <li><strong>Progress Tracking:</strong> See your improvement with clear stats and reports.</li>
      <li><strong>Anytime Access:</strong> Learn at your own pace, wherever you are.</li>
    </ul>
    <p className="text-gray-300">We make English learning smart, simple, and flexible for everyone.</p>
  </section>
);

export default Services;
