import React from 'react';

const Services = () => (
  <section id="services" className="py-12 bg-gradient-to-br from-[#EAEFEF] via-[#B8CFCE]/30 to-[#B8CFCE]/50 border border-[#7F8CAA] px-6 text-center rounded-3xl max-w-3xl mx-auto my-12 shadow-lg">
    <h2 className="text-3xl font-bold mb-6" style={{ color: '#333446' }}>Our Services</h2>
    <p className="mb-4 text-[#7F8CAA] text-lg">
      <strong>TalkWise</strong> offers smart, user-friendly tools to help you learn English effectively and enjoyably:
    </p>
    <ul className="list-disc list-inside mb-6 text-[#7F8CAA] space-y-2 inline-block text-left text-lg">
      <li><strong>Personalized Lessons:</strong> Tailored content based on your level and goals.</li>
      <li><strong>Real-Time Feedback:</strong> Instant tips on pronunciation and grammar.</li>
      <li><strong>AI Conversations:</strong> Practice with virtual characters in real-life scenarios.</li>
      <li><strong>Progress Tracking:</strong> See your improvement with clear stats and reports.</li>
      <li><strong>Anytime Access:</strong> Learn at your own pace, wherever you are.</li>
    </ul>
    <p className="text-[#7F8CAA] text-lg">We make English learning smart, simple, and flexible for everyone.</p>
  </section>
);

export default Services;
