import React, { useState } from 'react';

interface ChatbotSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotSidebar: React.FC<ChatbotSidebarProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);

    setInput('');

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      const botMessage = { sender: 'bot' as const, text: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot' as const, text: 'Error contacting AI agent.' }]);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-xl font-bold">SellerBot</h2>
        <button onClick={onClose} className="text-pink-600 font-bold text-lg">×</button>
      </div>

      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg text-sm max-w-xs ${
              msg.sender === 'user' ? 'bg-pink-100 self-end' : 'bg-gray-200 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about stock..."
          className="flex-1 border px-3 py-2 rounded-md text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-pink-500 text-white px-4 py-2 rounded-md text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotSidebar;
