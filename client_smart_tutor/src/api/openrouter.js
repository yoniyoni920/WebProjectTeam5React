import axios from 'axios';

// קבלת המפתח מקובץ הסביבה
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

console.log('API KEY:', API_KEY);

export async function sendChatMessage(message) {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.choices[0].message.content;
} 