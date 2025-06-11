import React from 'react';

const testimonials = [
  {
    name: 'Alon Barak',
    role: 'Software Engineer',
    text: '"TalkWise helps me articulate articles accurately and polish my writing. Simply an excellent tool!"',
    stars: 5,
  },
  {
    name: 'Michal Levi',
    role: 'Marketing Manager',
    text: "Using the text-to-speech tool helps me improve my English speaking. It's a real upgrade for my English presentations!",
    stars: 5,
  },
  {
    name: 'Dani Cohen',
    role: 'Student',
    text: '"With TalkWise, I managed to reach conversational fluency in a few months. Highly recommend!"',
    stars: 5,
  },
];

const Home = ({ onNavigate }) => (
  <section id="home" className="min-h-screen w-full text-center py-16 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-start">
    <div className="max-w-5xl w-full">
      <h1 className="text-5xl font-extrabold mb-4 text-white">
        Welcome to TalkWise
      </h1>
      <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
        Discover a smarter way to improve your English! TalkWise uses advanced AI to help you practice, translate, and speak English with confidence. Whether you're a student, professional, or just want to get better, our platform is here for you.
      </p>
      <div className="flex justify-center mb-10">
        <button
          onClick={() => onNavigate('ai')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition shadow-md"
        >
          Try AI Tools Now
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="mt-10 w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2 text-white">What Our Learners Say</h2>
        <p className="text-gray-400 mb-8">Thousands of people are already improving their English with our platform.</p>
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-stretch">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-xl p-6 flex-1 min-w-[260px] flex flex-col justify-between bg-transparent">
              <div className="flex items-center mb-2 justify-center">
                {Array.from({ length: t.stars }).map((_, idx) => (
                  <span key={idx} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-200 mb-4 italic">{t.text}</p>
              <div className="mt-auto">
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-gray-400 text-sm">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Home;
