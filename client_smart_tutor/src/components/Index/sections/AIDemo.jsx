import React, { useState } from 'react';
import { sendChatMessage } from '../../../api/openrouter';
import { textToSpeech } from '../../../api/tts';

const AIDemo = () => {
  // Chatbot
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Text-to-Speech
  const [ttsInput, setTtsInput] = useState('');
  const [ttsAudioUrl, setTtsAudioUrl] = useState('');
  const [ttsLoading, setTtsLoading] = useState(false);

  // Chatbot handler
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

  // Text-to-Speech handler
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
    <section className="content-section w-full px-0">
      <div className="section-inner w-full px-0">
        <h2 className="section-title">AI Tools Demo</h2>
        <div className="section-content grid grid-cols-1 md:grid-cols-2 gap-16 w-full px-0">
          {/* Chatbot */}
          <div className="about-card w-full max-w-none text-2xl p-12 min-h-[200px] md:col-span-2" style={{minWidth:0}}>
            <h3>Chatbot</h3>
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Ask anything..."
              style={{width: '100%', marginBottom: 8}}
            />
            <button onClick={handleChat} disabled={chatLoading} style={{marginBottom: 8}}>
              {chatLoading ? 'Loading...' : 'Send'}
            </button>
            <div style={{minHeight: 40}}>{chatResponse}</div>
          </div>

          {/* Text-to-Speech */}
          <div className="about-card w-full max-w-none text-2xl p-12 min-h-[200px] md:col-span-2" style={{minWidth:0}}>
            <h3>Text-to-Speech</h3>
            <input
              type="text"
              value={ttsInput}
              onChange={e => setTtsInput(e.target.value)}
              placeholder="Enter text to speak..."
              style={{width: '100%', marginBottom: 8}}
            />
            <button onClick={handleTTS} disabled={ttsLoading} style={{marginBottom: 8}}>
              {ttsLoading ? 'Creating audio...' : 'Convert Text to Speech'}
            </button>
            {ttsAudioUrl && (
              <audio controls src={ttsAudioUrl} style={{width: '100%'}} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDemo; 