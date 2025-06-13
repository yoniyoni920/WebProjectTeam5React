import { useState } from 'react';
import LoginModel from './LoginModel';
import Header from './sections/Header';
import Home from './sections/Home';
import About from './sections/About';
import Services from './sections/Services';
import Contact from './sections/Contact';
import Footer from './Footer';
import SignupForm from '../SignupForm';
import AIDemo from './sections/AIDemo';
import LoggedInUsers from './sections/LoggedInUsers';
import AdminMessages from './sections/AdminMessages';
import Articles from './sections/Articles';


function Index() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  const openLoginModel = () => {
    setShowLogin(true);
    setShowSignupForm(false);  
  };

  const closeLoginModel = () => setShowLogin(false);

  const openSignupFormModel = () => {
    setShowSignupForm(true);
    setShowLogin(false); 
  };

  const closeSignupFormModel = () => setShowSignupForm(false);

  const handleNavigate = (section) => {
    setActiveSection(section);
    setShowLogin(false);     
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


      {!showLogin && !showSignupForm && (
        <main className="pt-[125px] sm:pt-[100px] md:pt-[10px] lg:pt-10">

          {activeSection === 'home' && <Home onNavigate={handleNavigate} />}
          {activeSection === 'about' && <About />}
          {activeSection === 'services' && <Services />}
          {activeSection === 'contact' && <Contact />}
          {activeSection === 'admin-contact' && <AdminMessages user={loggedInUser} />}
          {activeSection === 'ai' && <AIDemo />}
          {activeSection === 'LoggedInUsers' && <LoggedInUsers />}
          {activeSection === 'articles' && <Articles />}
        </main>
      )}

      <Footer />
    </>
  );
}

export default Index;
