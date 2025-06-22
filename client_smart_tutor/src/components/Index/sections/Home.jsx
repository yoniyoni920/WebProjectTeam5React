import React from 'react';
import { ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Alon Barak',
    role: 'Software Engineer',
    text: 'TalkWise helps me articulate articles accurately and polish my writing. Simply an excellent tool!',
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
    text: 'With TalkWise, I managed to reach conversational fluency in a few months. Highly recommend!',
    stars: 5,
  },
];

const Index = ({ onNavigate }) => (
  <div className="min-h-screen">
    <section className="relative w-screen left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#EAEFEF] via-[#B8CFCE]/30 to-[#B8CFCE]/50 py-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-8 px-6">
        <h1 className="text-5xl lg:text-7xl font-black mb-6 text-[#333446] leading-tight">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-[#333446] to-[#7F8CAA] bg-clip-text text-transparent">
            TalkWise
          </span>
        </h1>
        <p className="text-xl lg:text-2xl text-[#7F8CAA] mb-8 max-w-2xl leading-relaxed mx-auto">
          Discover a smarter way to improve your English! TalkWise uses advanced AI to help you practice, translate, and speak English with confidence. Whether you're a student, professional, or just want to get better, our platform is here for you.
        </p>
        <button
          className="group bg-gradient-to-r from-[#7F8CAA] to-[#7F8CAA] hover:from-[#7F8CAA]/90 hover:to-[#7F8CAA]/90 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
          onClick={() => onNavigate && onNavigate('ai')}
        >
          Try AI Tools Now
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>

    <section className="relative w-screen left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#EAEFEF] via-[#B8CFCE]/30 to-[#B8CFCE]/50 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-black text-[#333446] mb-6">
          Why Choose{' '}
          <span className="bg-gradient-to-r from-[#333446] to-[#7F8CAA] bg-clip-text text-transparent">
            TalkWise?
          </span>
        </h2>
        <p className="text-xl text-[#7F8CAA] max-w-3xl mx-auto mb-16">
          Our platform combines cutting-edge AI technology with proven learning methodologies to help you achieve English fluency faster than traditional methods.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group home-card p-8 rounded-3xl border border-[#7F8CAA] hover:border-[#7F8CAA] transition-all duration-300 hover:shadow-lg hover:-translate-y-2">

            <div className="w-16 h-16 bg-gradient-to-br from-[#333446] to-[#7F8CAA] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold text-[#333446] mb-4">Personalized Lessons</h3>
            <p className="text-[#7F8CAA]">Tailored learning paths that adapt to your pace and style</p>
          </div>
          <div className="group home-card p-8 rounded-3xl border border-[#7F8CAA] hover:border-[#7F8CAA] transition-all duration-300 hover:shadow-lg hover:-translate-y-2">

            <div className="w-16 h-16 bg-gradient-to-br from-[#333446] to-[#7F8CAA] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold text-[#333446] mb-4">Real-Time Feedback</h3>
            <p className="text-[#7F8CAA]">Instant corrections and suggestions to improve faster</p>
          </div>
          <div className="group home-card p-8 rounded-3xl border border-[#7F8CAA] hover:border-[#7F8CAA] transition-all duration-300 hover:shadow-lg hover:-translate-y-2">

            <div className="w-16 h-16 bg-gradient-to-br from-[#333446] to-[#7F8CAA] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-[#333446] mb-4">AI Conversations</h3>
            <p className="text-[#7F8CAA]">Practice with intelligent tutors anytime, anywhere</p>
          </div>
        </div>
      </div>
    </section>

    <section className="relative w-screen left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#EAEFEF] to-[#B8CFCE]/30 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-black text-[#333446] mb-6">
          How It{' '}
          <span className="bg-gradient-to-r from-[#333446] to-[#7F8CAA] bg-clip-text text-transparent">
            Works
          </span>
        </h2>
        <p className="text-xl text-[#7F8CAA] max-w-3xl mx-auto mb-16">
          Get started in minutes and begin your journey to English fluency with our simple, effective process.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="process-card rounded-3xl shadow-lg p-8 border border-[#B8CFCE] hover:shadow-xl transition-all duration-300">

            <div className="w-20 h-20 bg-gradient-to-r from-[#333446] to-[#333446] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold text-[#333446] mb-4">Sign Up</h3>
            <p className="text-[#7F8CAA]">Create your profile and let our AI understand your goals</p>
          </div>
          <div className="process-card rounded-3xl shadow-lg p-8 border border-[#B8CFCE] hover:shadow-xl transition-all duration-300">

            <div className="w-20 h-20 bg-gradient-to-r from-[#7F8CAA] to-[#7F8CAA] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold text-[#333446] mb-4">Practice</h3>
            <p className="text-[#7F8CAA]">Engage with interactive lessons and AI conversations</p>
          </div>
          <div className="process-card rounded-3xl shadow-lg p-8 border border-[#B8CFCE] hover:shadow-xl transition-all duration-300">

            <div className="w-20 h-20 bg-gradient-to-r from-[#B8CFCE] to-[#B8CFCE] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-[#333446] mb-4">Improve</h3>
            <p className="text-[#7F8CAA]">Track your progress and achieve fluency faster</p>
          </div>
        </div>
      </div>
    </section>

    <section className="relative w-screen left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#B8CFCE]/30 to-[#EAEFEF] py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-black text-[#333446] mb-6">
          Success{' '}
          <span className="bg-gradient-to-r from-[#333446] to-[#7F8CAA] bg-clip-text text-transparent">
            Stories
          </span>
        </h2>
        <p className="text-xl text-[#7F8CAA] max-w-3xl mx-auto mb-16">
          Join thousands of learners who have transformed their English skills with TalkWise. Here's what they have to say about their journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card group rounded-3xl shadow-lg p-8 border border-[#B8CFCE] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">

              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#B8CFCE]/30 to-[#7F8CAA]/30 rounded-bl-full"></div>
              <div className="flex items-center justify-center mb-6">
                {Array.from({ length: t.stars }).map((_, idx) => (
                  <span key={idx} className="text-yellow-400 text-xl dark:text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-[#7F8CAA] mb-8 leading-relaxed text-lg italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#333446] to-[#7F8CAA] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#333446] text-lg">{t.name}</div>
                  <div className="role-text text-[#7F8CAA]">{t.role}</div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Index;
