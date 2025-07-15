import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const BuyerChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you with your shopping on Meesho. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: { [key: string]: string } = {
    'hello': 'Hello! Welcome to Meesho! I\'m here to help you with all your shopping needs. What can I help you find today?',
    'hi': 'Hi there! I\'m your shopping assistant. How can I help you today?',
    'order': 'For order related queries: You can track your order in "My Orders" section. Orders typically arrive within 7-10 days with free delivery!',
    'track': 'To track your order: Go to "My Orders" → Select your order → View tracking details. You\'ll get SMS updates too!',
    'return': 'Returns are easy! You have 7 days to return any item. Go to "My Orders" → Select item → "Return" → Choose reason. Free pickup available!',
    'refund': 'Refunds are processed within 7-10 business days after we receive your returned item. Money goes back to your original payment method.',
    'payment': 'We accept: Credit/Debit cards, Net Banking, UPI, Wallets, and Cash on Delivery. All payments are 100% secure!',
    'cod': 'Cash on Delivery is available for most products. Look for "COD Available" on product pages. No extra charges!',
    'delivery': 'We offer FREE delivery on all orders! Most items are delivered within 7-10 days across India.',
    'size': 'Size issues? Check our size guide on product pages. If it doesn\'t fit, easy returns within 7 days!',
    'quality': 'All products are quality checked. If you\'re not satisfied, return within 7 days for full refund. Customer satisfaction guaranteed!',
    'discount': 'Great deals daily! Check our homepage for latest offers, flash sales, and seasonal discounts. Save up to 80%!',
    'account': 'Account issues? You can reset password, update profile, manage addresses in "My Account" section.',
    'categories': 'Shop from 600+ categories: Fashion, Home & Kitchen, Electronics, Beauty, Kids, and more!',
    'support': 'Need more help? Call our 24/7 customer care: 080-61611000 or email: support@meesho.com'
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return 'I understand you need help with shopping on Meesho. For specific queries, please contact our customer support at support@meesho.com or call 080-61611000. Is there anything else I can help you with?';
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'Track my order',
    'Return policy',
    'Payment options',
    'Delivery time'
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Shopping Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-600 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                    <p className="text-sm">{message.text}</p>
                    {message.sender === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyerChatbot;