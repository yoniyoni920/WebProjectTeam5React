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
    <div className="fixed inset-0 bg-black/40 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-2xl shadow-2xl w-full max-w-lg mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-gray-300 text-2xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">How This Works</h2>

        <div className="text-lg space-y-2 leading-relaxed">
          {getHelpText()}
        </div>
      </div>
    </div>
  );
};

export default Help;
