import React from 'react';

const Help = ({ activeTool, showHistory, onClose }) => {
  const getHelpText = () => {
    if (activeTool === 'chatbot') {
      return 'Chat with our AI to practice English conversation!';
    } else if (activeTool === 'tts') {
      return 'Type something and listen to how it sounds in English!';
    } else if (activeTool === 'wordgame') {
      return showHistory ? (
        'Here you can review your past game scores and track your progress!'
      ) : (
        <>
          Guess the correct English word based on hints. Improve your vocabulary through play!<br />
          • 1–2 correct answers will reduce difficulty,<br />
          • 3 correct answers will keep the same difficulty,<br />
          • 4–5 correct answers will increase to harder questions!<br />
          Unregistered users can only play on easy difficulty
        </>
      );
    }
    return '';
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl w-full max-w-lg mx-4 relative">
        <button
          onClick={onClose}
          style={{ width: '1cm', height: '1cm', minWidth: 0, minHeight: 0, padding: 0, border: 'none', appearance: 'none' }}
  className="
    absolute top-4 right-4
    bg-[#7F8CAA] text-white font-bold
    shadow-md hover:bg-[#6a7899]
    transition-all duration-200
    flex items-center justify-center
    rounded-none
    overflow-hidden
  "
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">How This Works</h2>

        <div className="text-lg space-y-2 leading-relaxed">
          {getHelpText()}
        </div>
      </div>
    </div>
  );
};

export default Help;
