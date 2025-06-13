import { useState } from 'react';

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  const increaseFontSize = () => {
    const newSize = fontSize + 2;
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(12, fontSize - 2);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const toggleContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
  };

  return (
    <>
      <button className="accessibility-toggle" onClick={togglePanel}>מצב נגישות</button>

{isOpen && (
  <div className="accessibility-panel">
    <h3 className="accessibility-title">תפריט נגישות</h3>
    <button className="accessibility-button" onClick={increaseFontSize}>הגדל טקסט</button>
    <button className="accessibility-button" onClick={decreaseFontSize}>הקטן טקסט</button>
    <button className="accessibility-button" onClick={toggleContrast}>שינוי ניגודיות</button>
  </div>
      )}
    </>
  );
};
/*
// עיצוב כפתור הראשי
const toggleButtonStyle = {
  position: 'fixed',
  top: '105px',
  right: '10px',
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
  padding: '10px 14px',
  borderRadius: '8px',
  cursor: 'pointer',
  zIndex: 1001,
  fontSize: '14px',
};

// עיצוב התפריט
const panelStyle = {
  position: 'fixed',
  top: '130px',
  right: '20px',
  backgroundColor: '#222',
  color: '#fff',
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
  zIndex: 1000,
  width: '180px',
  fontFamily: 'sans-serif',
};

// כפתורים
const buttonStyle = {
  margin: '6px 0',
  padding: '10px',
  width: '100%',
  fontSize: '14px',
  borderRadius: '6px',
  border: '1px solid #444',
  backgroundColor: '#444',
  color: '#fff',
  cursor: 'pointer',
};

const titleStyle = {
  margin: '0 0 12px',
  fontSize: '16px',
  textAlign: 'center',
};
*/

export default AccessibilityPanel;
