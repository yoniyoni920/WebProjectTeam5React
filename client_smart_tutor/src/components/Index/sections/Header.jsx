import React from 'react';

const Header = ({ onLoginClick, onSignupClick, onNavigate }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
 const handleLogout = async () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const username = user?.username;

  if (username) {
    try {
           
      await fetch('/api/logout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    }
  }

  localStorage.removeItem("loggedInUser");
  window.location.reload(); // Reload or redirect to login/home page
};


  return (
     <header className="fixed top-0 left-0 right-0 bg-gray-800 dark:bg-gray-900 text-white px-4 py-3 shadow-md z-50 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="text-2xl font-bold mb-4 md:mb-0">TALKWISE</div>

      <nav className="mb-4 md:mb-0">
        <ul className="grid grid-cols-3 gap-3 md:flex md:space-x-6">

          <li>
            <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition focus:outline-none">Home</button>
          </li>
          <li>
            <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition focus:outline-none">About</button>
          </li>
          <li>
            <button onClick={() => onNavigate('services')} className="hover:text-blue-400 transition focus:outline-none">Services</button>
          </li>
          <li>
            <button onClick={() => onNavigate('articles')} className="hover:text-blue-400 transition focus:outline-none">Articles</button>
          </li>
          <li>
            <button
              onClick={() => {
                const user = JSON.parse(localStorage.getItem("loggedInUser"));
                if (user?.role === "Admin") {
                  onNavigate("admin-contact");
                } else {
                  onNavigate("contact");
                }
              }}
              className="hover:text-blue-400 transition focus:outline-none"
            >
              Contact
            </button>
          </li>

           <li>
          <button onClick={() => onNavigate('ai')} className="hover:text-blue-400 transition focus:outline-none">AI Tools</button>
        </li>
        </ul>
      </nav>

      <div className="flex space-x-8">
        
        {loggedInUser ? (
          <>
          
            <span className="bg-gray-700 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded transition">
              Welcome, {loggedInUser.username}
            </span>
              {loggedInUser.role === 'Admin' && (
                <button
                  onClick={() => onNavigate('LoggedInUsers')}
                  className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-4 py-2 rounded transition"
                >
                  View Logged In Users
                </button>
              )}


            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>

          ) : (
          <>
            <button onClick={onLoginClick} className="bg-purple-800 text-white px-4 py-2 rounded-md" style={{ marginRight: '1rem' }}>Log In</button>
            <button onClick={onSignupClick} className="bg-purple-800 text-white px-4 py-2 rounded-md">Sign Up</button>
          </>
        )}
      </div>
      
    </header>
  );
};

export default Header;
