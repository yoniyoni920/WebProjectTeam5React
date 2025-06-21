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
import UpdateUserForm from './sections/UpdateUserForm'; 

function Index() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const [activeSection, setActiveSection] = useState('home');
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  const openLoginModel = () => {
    setShowLogin(true);
    setShowSignupForm(false);
    setShowUpdateForm(false);
  };

  const closeLoginModel = () => setShowLogin(false);

  const openSignupFormModel = () => {
    setShowSignupForm(true);
    setShowLogin(false);
    setShowUpdateForm(false);
  };

  const closeSignupFormModel = () => setShowSignupForm(false);

  const handleNavigate = (section) => {
    setActiveSection(section);
    setShowLogin(false);
    setShowSignupForm(false);
    setShowUpdateForm(false);
  };

  const toggleUpdateForm = () => {
    setShowUpdateForm(prev => !prev);
    setShowLogin(false);
    setShowSignupForm(false);
  };

  return (
    <>
      {showLogin && (
        <div className="mt-24 z-50">
          <LoginModel onClose={closeLoginModel} />
        </div>
      )}


      {showSignupForm && 
       <div className="mt-24 z-50">
          <SignupForm onClose={closeSignupFormModel} />
        </div>}

        
      {showUpdateForm && 
        <div className="mt-24 z-50">
          <UpdateUserForm />
        </div>} 

      <Header
        onLoginClick={openLoginModel}
        onSignupClick={openSignupFormModel}
        onNavigate={handleNavigate}
      />

      
      {loggedInUser && !showLogin && !showSignupForm && (
        <div className="fixed bottom-8 right-6 z-50">
          <button
            onClick={toggleUpdateForm}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            {showUpdateForm ? 'Close Update Form' : 'Update My Info'}
          </button>
        </div>
      )}

      {!showLogin && !showSignupForm && !showUpdateForm && (
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
