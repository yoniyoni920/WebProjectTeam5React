import { useState } from 'react';

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode]=useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  const increaseFontSize = () => {
    const newSize =Math.min(30, fontSize + 2);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(12, fontSize - 2);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  /*
  <button className="accessibility-button" onClick={toggleContrast}>Change Constrast </button>
  const toggleContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
  };
  */


  const toggleDarkMode = () => {
  const newMode = !darkMode;
  setDarkMode(newMode);
  document.body.classList.toggle('dark-mode', newMode);
};


  return (
    <>
      <button className="accessibility-toggle" onClick={togglePanel}>Accessibility </button>

{isOpen && (
  <div className="accessibility-panel">
    <h3 className="accessibility-title">Accessibility Menu</h3>
    <button className="accessibility-button" onClick={increaseFontSize}>Increase Font  </button>
    <button className="accessibility-button" onClick={decreaseFontSize}>Decrease Font  </button>
    <button className="accessibility-button" onClick={toggleDarkMode}>{darkMode ? "Light" : "Dark " }</button>
  </div>
      )}
    </>
  );
};


export default AccessibilityPanel;
