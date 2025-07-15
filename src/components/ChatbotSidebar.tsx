import React, { useState, useRef, useEffect } from 'react';

interface ChatbotSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const ChatbotSidebar: React.FC<ChatbotSidebarProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      const botMessage: Message = { sender: 'bot', text: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: '❌ Unable to reach AI server.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b bg-pink-50">
        <h2 className="text-xl font-bold text-pink-700">SellerBot</h2>
        <button onClick={onClose} className="text-pink-600 font-bold text-lg">×</button>
      </div>

      {/* Messages */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg text-sm max-w-xs ${
              msg.sender === 'user'
                ? 'bg-pink-100 self-end text-right'
                : 'bg-gray-200 self-start text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 self-start">Thinking...</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about a product..."
          className="flex-1 border px-3 py-2 rounded-md text-sm outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button
          onClick={handleSend}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotSidebar;
