import React, { useState, useRef } from 'react';
import { sendChatMessage } from '../../../api/openrouter';
import { translateText } from '../../../api/translate';
import { transcribeAudio } from '../../../api/whisper';
import { textToSpeech } from '../../../api/tts';

const AIDemo = () => {
  // Chatbot
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Translate
  const [translateInput, setTranslateInput] = useState('');
  const [translateOutput, setTranslateOutput] = useState('');
  const [translateLoading, setTranslateLoading] = useState(false);

  // Speech-to-Text
  const [audioText, setAudioText] = useState('');
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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

  // Translate handler
  const handleTranslate = async () => {
    setTranslateLoading(true);
    try {
      const res = await translateText(translateInput, 'en');
      setTranslateOutput(res);
    } catch (e) {
      setTranslateOutput('Error: ' + e.message);
    }
    setTranslateLoading(false);
  };

  // Speech-to-Text handlers
  const startRecording = async () => {
    setAudioText('');
    setRecording(true);
    audioChunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new window.MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const text = await transcribeAudio(audioBlob);
      setAudioText(text);
    };
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
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
    <section className="content-section">
      <div className="section-inner">
        <h2 className="section-title">AI Tools Demo</h2>
        <div className="section-content" style={{gap: '2.5rem'}}>
          {/* Chatbot */}
          <div className="about-card">
            <h3>Chatbot (OpenRouter)</h3>
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

          {/* Translate */}
          <div className="about-card">
            <h3>Translate (LibreTranslate)</h3>
            <input
              type="text"
              value={translateInput}
              onChange={e => setTranslateInput(e.target.value)}
              placeholder="הכנס טקסט לתרגום..."
              style={{width: '100%', marginBottom: 8}}
            />
            <button onClick={handleTranslate} disabled={translateLoading} style={{marginBottom: 8}}>
              {translateLoading ? 'מתרגם...' : 'תרגם לאנגלית'}
            </button>
            <div style={{minHeight: 40}}>{translateOutput}</div>
          </div>

          {/* Speech-to-Text */}
          <div className="about-card">
            <h3>Speech-to-Text (Whisper Web)</h3>
            <button onClick={recording ? stopRecording : startRecording} style={{marginBottom: 8}}>
              {recording ? 'עצור הקלטה' : 'התחל להקליט'}
            </button>
            <div style={{minHeight: 40}}>{audioText}</div>
          </div>

          {/* Text-to-Speech */}
          <div className="about-card">
            <h3>Text-to-Speech (ElevenLabs)</h3>
            <input
              type="text"
              value={ttsInput}
              onChange={e => setTtsInput(e.target.value)}
              placeholder="Enter text to speak..."
              style={{width: '100%', marginBottom: 8}}
            />
            <button onClick={handleTTS} disabled={ttsLoading} style={{marginBottom: 8}}>
              {ttsLoading ? 'יוצר אודיו...' : 'המר לטקסט לדיבור'}
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