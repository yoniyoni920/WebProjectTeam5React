import React, { useState } from 'react';
import { sendChatMessage } from '../../../api/gemini';
import { textToSpeech } from '../../../api/tts';
import WordGuessGame from './WordGuessGame';
import ScoreHistory from './ScoreHistory';  
import Help from './Help'; // Make sure the path is correct

const AIDemo = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const username = loggedInUser?.username;
  const [showHelp, setShowHelp] = useState(false);

  const [activeTool, setActiveTool] = useState('chatbot');
  const [showHistory, setShowHistory] = useState(false);

  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const [ttsInput, setTtsInput] = useState('');
  const [ttsAudioUrl, setTtsAudioUrl] = useState('');
  const [ttsLoading, setTtsLoading] = useState(false);

  const handleChat = async () => {
    setChatLoading(true);
    try {
      const res = await sendChatMessage(chatInput);
      setChatResponse(res);
    } catch (e) {
      setChatResponse('Error: ' + e.message);
    }
    setChatLoading(false);
  };

  const handleTTS = async () => {
    setTtsLoading(true);
    setTtsAudioUrl('');
    try {
      const audioBlob = await textToSpeech(ttsInput);
      const url = URL.createObjectURL(audioBlob);
      setTtsAudioUrl(url);
    } catch (e) {
      setTtsAudioUrl('');
      alert('TTS Error: ' + e.message);
    }
    setTtsLoading(false);
  };

  return (
    <section className=" bg-gradient-to-br from-[#EAEFEF] via-[#B8CFCE]/15 to-[#B8CFCE]/50   dark:from-gray-800 dark:via-gray-700/30 dark:to-gray-700/50 py-16 relative">

      
<button
  onClick={() => setShowHelp(true)}
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
  title="Help"
>
  <span style={{ fontSize: '1rem', lineHeight: 1, userSelect: 'none' }}>?</span>
</button>




      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10 text-[#333446] text-center dark:text-white">AI Tools</h2>

        {/* Tool Selector */}
        <div className="tool-selector mb-10 flex justify-center gap-6">
          <button
            onClick={() => setActiveTool('chatbot')}
            className={`px-6 py-3 rounded-xl font-bold text-lg shadow-md border border-[#7F8CAA] transition-all duration-200 ${activeTool === 'chatbot' ? 'bg-[#7F8CAA] text-white' : 'bg-white text-[#7F8CAA] hover:bg-[#eaf0f0]'}`}
          >
            Chatbot
          </button>
          <button
            onClick={() => setActiveTool('tts')}
            className={`px-6 py-3 rounded-xl font-bold text-lg shadow-md border border-[#7F8CAA] transition-all duration-200 ${activeTool === 'tts' ? 'bg-[#7F8CAA] text-white' : 'bg-white text-[#7F8CAA] hover:bg-[#eaf0f0]'}`}
          >
            Text-to-Speech
          </button>
          <button
            onClick={() => setActiveTool('wordgame')}
            className={`px-6 py-3 rounded-xl font-bold text-lg shadow-md border border-[#7F8CAA] transition-all duration-200 ${activeTool === 'wordgame' ? 'bg-[#7F8CAA] text-white' : 'bg-white text-[#7F8CAA] hover:bg-[#eaf0f0]'}`}
          >
            Word Guess Game
          </button>
        </div>

        {/* Tool Content */}
        <div className="grid grid-cols-1 gap-12">
          {activeTool === 'chatbot' && (
            <div className="about-card w-full max-w-none text-2xl p-12 min-h-[200px] bg-gradient-to-br from-[#7F8CAA] to-white border border-[#7F8CAA] rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-[#333446]">Chatbot</h3>
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask anything..."
                className="w-full border border-[#7F8CAA] rounded-lg px-4 py-3 bg-white text-[#333446] focus:outline-none focus:ring-2 focus:ring-[#7F8CAA] text-lg mb-4"
              />
              <button
                onClick={handleChat}
                disabled={chatLoading}
                className="bg-[#7F8CAA] hover:bg-[#6a7899] text-white font-bold px-8 py-3 rounded-xl text-lg shadow-md transition-all duration-200 w-full mb-4"
              >
                {chatLoading ? 'Loading...' : 'Send'}
              </button>
              <div className="min-h-[40px] text-[#7F8CAA]">{chatResponse}</div>
            </div>
          )}

          {activeTool === 'tts' && (
            <div className="about-card w-full max-w-none text-2xl p-12 min-h-[200px] bg-gradient-to-br from-[#7F8CAA] to-white border border-[#7F8CAA] rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-[#333446]">Text-to-Speech</h3>
              <input
                type="text"
                value={ttsInput}
                onChange={e => setTtsInput(e.target.value)}
                placeholder="Enter text to speak..."
                className="w-full border border-[#7F8CAA] rounded-lg px-4 py-3 bg-white text-[#333446] focus:outline-none focus:ring-2 focus:ring-[#7F8CAA] text-lg mb-4"
              />
              <button
                onClick={handleTTS}
                disabled={ttsLoading}
                className="bg-[#7F8CAA] hover:bg-[#6a7899] text-white font-bold px-8 py-3 rounded-xl text-lg shadow-md transition-all duration-200 w-full mb-4"
              >
                {ttsLoading ? 'Creating audio...' : 'Convert Text to Speech'}
              </button>
              {ttsAudioUrl && <audio controls src={ttsAudioUrl} className="w-full" />}
            </div>
          )}

          {activeTool === 'wordgame' && (
            <div className="about-card w-full max-w-none text-2xl p-12 min-h-[100px] bg-gradient-to-br from-[#7F8CAA] to-white border border-[#7F8CAA] rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-[#333446]">Word Guess Game</h3>
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setShowHistory(false)}
                  disabled={!showHistory}
                  className={`px-6 py-2 rounded-lg font-bold text-lg border border-[#7F8CAA] transition-all duration-200 ${!showHistory ? 'bg-[#7F8CAA] text-white' : 'bg-white text-[#7F8CAA] hover:bg-[#eaf0f0]'}`}
                >
                  Play Game
                </button>
                <button
                  onClick={() => setShowHistory(true)}
                  disabled={showHistory}
                  className={`px-6 py-2 rounded-lg font-bold text-lg border border-[#7F8CAA] transition-all duration-200 ${showHistory ? 'bg-[#7F8CAA] text-white' : 'bg-white text-[#7F8CAA] hover:bg-[#eaf0f0]'}`}
                >
                  View Score History
                </button>
              </div>
              {showHistory ? (
                <ScoreHistory username={username} />
              ) : (
                <WordGuessGame username={username} />
              )}
            </div>
          )}
        </div>
      </div>

      
      {showHelp && (
        <Help
          activeTool={activeTool}
          showHistory={showHistory}
          onClose={() => setShowHelp(false)}
        />
      )}
    </section>
  );
};

export default AIDemo;
