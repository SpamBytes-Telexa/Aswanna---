import { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('english');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: query }]);

    try {
      const res = await fetch('http://localhost:8000/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'සර්වරය සම්බන්ධ කර ගැනීමට දෝෂයක් ඇත.' }]);
    } finally {
      setQuery('');
      setLoading(false);
    }
  };

  // Sinhala translations for static texts
  const texts = {
    header: '🌾 අස්වැන්න චැට්බොට්',
    selectLanguage: 'භාෂාව තෝරන්න:',
    placeholder: 'කිසිවක් අසන්න...',
    startConversation: 'පහළින් ටයිප් කර කථාබස් ආරම්භ කරන්න...',
    userLabel: 'ඔබ',
    botLabel: 'අස්වැන්න',
    sendButton: loading ? 'යැවීම...' : 'යවන්න',
    errorMessage: 'සර්වරය සම්බන්ධ කර ගැනීමට දෝෂයක් ඇත.',
  };

  const formatResponse = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        // Bold headers (e.g., **Topic**)
        return (
          <h3 key={i} className="font-bold text-lg mt-4 mb-2 text-green-800">
            {line.replace(/\*\*/g, '')}
          </h3>
        );
      } else if (line.trim().startsWith('*')) {
        // Bullet points
        return (
          <li key={i} className="ml-5 list-disc">
            {line.replace('*', '').trim()}
          </li>
        );
      } else if (line.trim() === '') {
        // Empty lines (add spacing)
        return <br key={i} />;
      } else {
        // Regular paragraphs
        return <p key={i} className="mb-2">{line}</p>;
      }
    });
  };


  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="bg-green-700 text-white p-5 text-center text-2xl font-extrabold tracking-wide shadow-md">
        {texts.header}
      </header>

      <div className="p-5 bg-white border-b border-green-300">
        <label className="block text-sm font-semibold text-green-800 mb-2">
          {texts.selectLanguage}
        </label>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="w-full max-w-xs border border-green-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          <option value="english">English</option>
          <option value="sinhala">සිංහල</option>
        </select>
      </div>

      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.length === 0 && (
          <p className="text-green-400 text-center mt-12 italic select-none">
            {texts.startConversation}
          </p>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-5 py-3 rounded-2xl break-words shadow-md ${
                msg.role === 'user'
                  ? 'bg-green-600 text-white rounded-br-none'
                  : 'bg-green-100 text-green-900 rounded-bl-none'
              }`}
            >
              <span className="font-semibold block mb-1 select-none">
                {msg.role === 'user' ? texts.userLabel : texts.botLabel}
              </span>
              {/* Updated: Use formatted response */}
              <div className="whitespace-pre-wrap">
                {msg.role === 'bot' ? formatResponse(msg.text) : msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-5 bg-white border-t border-green-300 flex items-center space-x-3 shadow-lg">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={texts.placeholder}
          className="flex-grow border border-green-300 rounded-2xl px-5 py-3 text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-green-700 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-green-800 transition disabled:opacity-60 disabled:cursor-not-allowed shadow"
        >
          {loading ? 'යැවීම...' : 'යවන්න'}
        </button>
      </footer>
    </div>
  );
}

export default Chatbot;
