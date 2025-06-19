import React from 'react';

const About = () => (
  <section id="about" className="relative w-screen left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#EAEFEF] via-[#B8CFCE]/30 to-[#B8CFCE]/50 py-24">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-4xl lg:text-5xl font-black text-[#333446] mb-6">About Us</h2>
      <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="about-card group bg-gradient-to-br from-[#333446] to-white p-8 rounded-3xl border border-[#333446] hover:border-[#333446] transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
          <h3 id="about-mission-title" className="text-2xl font-bold mb-6">Our Mission</h3>
          <p id="about-mission-text" className="text-[#7F8CAA] text-lg leading-relaxed">
            We are a team of passionate computer science students dedicated to revolutionizing English language learning through artificial intelligence.<br/>
            Our goal is to make language learning accessible, engaging, and effective for everyone.
          </p>
        </div>
        <div className="about-card group bg-gradient-to-br from-[#7F8CAA] to-white p-8 rounded-3xl border border-[#7F8CAA] hover:border-[#7F8CAA] transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
          <h3 id="smart-tutor-title" className="text-2xl font-bold mb-6">Smart Tutor</h3>
          <p id="smart-tutor-text" className="text-[#7F8CAA] text-lg leading-relaxed">
            Smart Tutor is our innovative platform that combines cutting-edge AI technology with proven language learning methodologies.<br/>
            We're creating a friendly and intelligent environment where users can improve their English skills naturally and effectively.
          </p>
        </div>
        <div className="about-card group bg-gradient-to-br from-[#7F8CAA] to-white p-8 rounded-3xl border border-[#7F8CAA] hover:border-[#7F8CAA] transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
          <h3 id="our-team-title" className="text-2xl font-bold mb-6">Our Team</h3>
          <p id="our-team-text" className="text-[#7F8CAA] text-lg leading-relaxed">
            Meet our dedicated team of third-year computer science students:
          </p>
          <ul className="team-list grid grid-cols-2 gap-2 mt-2">
            <li className="text-[#7F8CAA] bg-white/60 rounded px-2 py-1">Roni</li>
            <li className="text-[#7F8CAA] bg-white/60 rounded px-2 py-1">Shiraz</li>
            <li className="text-[#7F8CAA] bg-white/60 rounded px-2 py-1">Shir</li>
            <li className="text-[#7F8CAA] bg-white/60 rounded px-2 py-1">Matan</li>
            <li className="text-[#7F8CAA] bg-white/60 rounded px-2 py-1">Eli</li>
            <li className="text-[#7F8CAA] bg-white/60 rounded px-2 py-1">Yoni</li>
          </ul>
        </div>
        <div className="about-card group bg-gradient-to-br from-[#7F8CAA] to-white p-8 rounded-3xl border border-[#7F8CAA] hover:border-[#7F8CAA] transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
          <h3 id="our-vision-title" className="text-2xl font-bold mb-6">Our Vision</h3>
          <p id="our-vision-text" className="text-[#7F8CAA] text-lg leading-relaxed">
            We envision a world where language barriers are broken down through technology.<br/>
            By combining our technical expertise with our passion for education, we're building a platform that makes learning English more accessible and enjoyable than ever before.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;