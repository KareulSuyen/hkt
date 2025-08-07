import { useState } from 'react';
import { sendPrompt } from '../api';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState(''); // 👈 for showing the result

  const handleChat = async () => {
    try {
      const res = await sendPrompt(prompt);
      setAiResponse(res.response); // 👈 update the response
    } catch (err) {
      console.error("Something broke:", err);
      setAiResponse("⚠️ Something went wrong."); // optional fallback
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Ask something..."
      />
      <button onClick={handleChat}>Ask AI</button>

      {aiResponse && (
        <div style={{ marginTop: '1rem', padding: '10px', border: '1px solid #ccc' }}>
          <strong>AI says:</strong> {aiResponse}
        </div>
      )}
    </div>
  );
};

export default Home;
