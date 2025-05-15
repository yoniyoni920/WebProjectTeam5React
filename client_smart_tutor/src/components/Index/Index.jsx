import { useState } from 'react';
import LoginModel from './LoginModel';
import Header from './sections/Header';
import Home from './sections/Home';
import About from './sections/About';
import Services from './sections/Services';
import Contact from './sections/Contact';
import Footer from './Footer';
import SignupForm from '../SignupForm';
function Index() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const openLoginModel = () => {
    setShowLogin(true);
    setShowSignupForm(false);  // Close signup if open
  };

  const closeLoginModel = () => setShowLogin(false);

  const openSignupFormModel = () => {
    setShowSignupForm(true);
    setShowLogin(false); // Close login if open
  };

  const closeSignupFormModel = () => setShowSignupForm(false);

  const handleNavigate = (section) => {
    setActiveSection(section);
    setShowLogin(false);      // Close any modals when navigating sections
    setShowSignupForm(false);
  };

  return (
    <>
      {showLogin && <LoginModel onClose={closeLoginModel} />}
      {showSignupForm && <SignupForm onClose={closeSignupFormModel} />}

      <Header
        onLoginClick={openLoginModel}
        onSignupClick={openSignupFormModel}
        onNavigate={handleNavigate}
      />

      {/* Only show main content when no modals are open */}
      {!showLogin && !showSignupForm && (
        <main className="pt-16 max-w-5xl mx-auto p-6 bg-gray-900 rounded-lg mt-6 space-y-12 min-h-[70vh]">
          {activeSection === 'home' && <Home />}
          {activeSection === 'about' && <About />}
          {activeSection === 'services' && <Services />}
          {activeSection === 'contact' && <Contact />}
        </main>
      )}

      <Footer />
    </>
  );
}

export default Index;
