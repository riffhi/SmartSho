
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Package, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SellerChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Stock Assistant. I can provide stock recommendations, sales predictions, and product analysis for your specific products: Cotton Kurti (P001), Plastic Water Bottle (P002), Men's Sports Shoes (P003), and LED Bulb (P004). What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string>('English');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Exact products from your CSV with product IDs
  const availableProducts = [
    { id: 'P001', name: 'Cotton Kurti', price: 499, category: 'Fashion' },
    { id: 'P002', name: 'Plastic Water Bottle', price: 199, category: 'Home & Kitchen' },
    { id: 'P003', name: 'Men\'s Sports Shoes', price: 899, category: 'Footwear' },
    { id: 'P004', name: 'LED Bulb', price: 99, category: 'Electronics' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // API call to your ML backend
      const res = await fetch('https://smartsho-6.onrender.com/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      });

      const data = await res.json();

      // Simulate realistic typing delay for detailed responses
      const typingDelay = Math.min(Math.max(currentInput.length * 60, 2000), 4500);
      
      setTimeout(() => {
        setIsTyping(false);
        
        const botReply: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response || '⚠️ No response received from server.',
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botReply]);
        
        if (data.detectedLanguage) {
          setDetectedLanguage(data.detectedLanguage);
        }
      }, typingDelay);

    } catch (err) {
      setIsTyping(false);
      const botError: Message = {
        id: (Date.now() + 2).toString(),
        text: '❌ Unable to connect to AI service. Please check your connection and try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botError]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Product-specific questions using exact product IDs and names from CSV
  const quickQuestionCategories = [
    {
      title: "📦 Stock Recommendations",
      icon: <Package className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500",
      questions: [
        "Stock recommendation for P001",
        "Stock recommendation for P002", 
        "Stock recommendation for P003",
        "Stock recommendation for P004",
        "Should I restock Cotton Kurti?",
        "Plastic Water Bottle stock status",
        "P001 स्टॉक सिफारिश", // Hindi for P001
        "LED Bulb inventory check"
      ]
    },
    {
      title: "📈 Sales Predictions",
      icon: <TrendingUp className="w-4 h-4" />,
      color: "from-green-500 to-emerald-500", 
      questions: [
        "Sales prediction for P001",
        "P002 sales forecast",
        "Men's Sports Shoes next week sales",
        "P004 demand prediction",
        "Cotton Kurti sales trend",
        "P003 बिक्री पूर्वानुमान", // Hindi for P003
        "LED Bulb future sales",
        "Water Bottle weekly forecast"
      ]
    },
    {
      title: "📊 Product Analysis", 
      icon: <BarChart3 className="w-4 h-4" />,
      color: "from-purple-500 to-pink-500",
      questions: [
        "P001 product analysis",
        "Analyze P002 performance",
        "P003 sales analysis",
        "P004 product insights",
        "Cotton Kurti performance review",
        "Sports Shoes vs Water Bottle",
        "P001 विश्लेषण", // Hindi for P001
        "LED Bulb trend analysis"
      ]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState(0);

  // Enhanced typing indicator for detailed responses
  const TypingIndicator = () => (
    <div className="flex justify-start">
      <div className="max-w-[85%] p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 shadow-sm border border-blue-100">
        <div className="flex items-center space-x-3">
          <Bot className="w-4 h-4 flex-shrink-0 text-blue-600" />
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className="text-xs">
            <div className="text-blue-600 font-medium">AI is analyzing data...</div>
            <div className="text-gray-500">Calculating inventory metrics</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-50 group animate-pulse hover:animate-none"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        
        {/* Live indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Stock & Sales AI Assistant
        </div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-4 fade-in duration-300 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-3 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <div className="font-bold text-base">Stock & Sales AI</div>
                <div className="text-xs opacity-90 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  {detectedLanguage} • Live Analytics
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:bg-opacity-20 p-1.5 rounded-xl transition-all duration-200 hover:rotate-90 group"
            >
              <X className="w-4 h-4 group-hover:scale-110" />
            </button>
          </div>

          {/* Product ID Reference Banner */}
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-2 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-700 mb-1">🏷️ Your Products:</div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {availableProducts.map((product) => (
                <div key={product.id} className="flex items-center bg-white px-2 py-1 rounded text-xs shadow-sm border">
                  <span className="font-mono text-blue-600 mr-1">{product.id}:</span>
                  <span className="text-gray-700 truncate text-xs">{product.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] p-2.5 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      {/* Format bot responses to preserve structure and render markdown */}
                      <div className={`text-sm leading-relaxed ${
                        message.sender === 'user' ? 'whitespace-pre-wrap' : 'whitespace-pre-line'
                      }`}>
                        {message.sender === 'bot' ? (
                          <div 
                            dangerouslySetInnerHTML={{
                              __html: message.text
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-blue-800">$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
                                .replace(/•/g, '<span class="text-blue-600 font-bold">•</span>')
                            }}
                          />
                        ) : (
                          message.text
                        )}
                      </div>
                      <div className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions - Only for initial interaction */}
          {messages.length <= 1 && !isTyping && (
            <div className="px-3 pb-2 bg-gray-50 border-t border-gray-100">
              {/* Category Tabs */}
              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-600 mb-1.5">✨ Ask about your products:</p>
                <div className="grid grid-cols-3 gap-1">
                  {quickQuestionCategories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(index)}
                      className={`flex flex-col items-center p-1.5 rounded-xl text-xs transition-all duration-200 ${
                        selectedCategory === index
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                          : 'bg-white text-gray-600 hover:bg-gray-50 border hover:border-gray-300'
                      }`}
                    >
                      <div className={`mb-0.5 ${selectedCategory === index ? 'scale-110' : ''} transition-transform`}>
                        {category.icon}
                      </div>
                      <span className="font-medium leading-tight text-center text-xs">
                        {category.title.split(' ').slice(1).join(' ')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product-specific questions */}
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {quickQuestionCategories[selectedCategory].questions.slice(0, 4).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="w-full text-xs bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 px-2 py-1.5 rounded-lg transition-all text-left border border-gray-200 hover:border-blue-300 hover:shadow-sm group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span className="group-hover:text-blue-700 font-medium flex items-center text-xs">
                        {question.includes('P00') && (
                          <span className="bg-blue-100 text-blue-600 px-1 py-0.5 rounded text-xs font-mono mr-1">
                            {question.match(/P00\d/)?.[0]}
                          </span>
                        )}
                        {question}
                      </span>
                      <Send className="w-2.5 h-2.5 opacity-0 group-hover:opacity-70 text-blue-500 transition-all group-hover:translate-x-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex space-x-2">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about P001, P002, P003, or P004..."
                  disabled={isTyping}
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all placeholder:text-gray-400"
                  rows={1}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2.5 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed self-end group transform hover:scale-105"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            
            {/* Status */}
            <div className="mt-2 text-xs text-center">
              {isTyping ? (
                <div className="flex items-center justify-center text-blue-600">
                  <Package className="w-3 h-3 mr-1" />
                  🧮 Calculating metrics...
                </div>
              ) : (
                <div className="text-gray-400 flex items-center justify-center space-x-1 text-xs">
                  <span>📊 P001-P004</span>
                  <span>•</span>
                  <span>📅 June 2024</span>
                  <span>•</span>
                  <span>🌐 Multi-language</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerChatbot;