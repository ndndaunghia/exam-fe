import React, { useState } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import { generateText } from '../../services/chatbot/chatbot';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      content: 'Xin chào! Tôi có thể giúp gì cho bạn?'
    }
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;
  
    try {
      // Thêm tin nhắn người dùng vào chat
      setChatHistory(prev => [...prev, {
        type: 'user',
        content: message
      }]);
  
      // Hiển thị trạng thái đang gửi
      setChatHistory(prev => [...prev, {
        type: 'bot',
        content: 'Đang xử lý...',
        isLoading: true
      }]);
  
      const response = await generateText(message);

      console.log(response);
      
  
      setChatHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = {
          type: 'bot',
          content: response.toString()
        };
        return newHistory;
      });
  
    } catch (error) {
      // Xử lý lỗi
      setChatHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = {
          type: 'bot',
          content: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.'
        };
        return newHistory;
      });
    } finally {
      setMessage(''); // Clear input
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-20 mr-4">
      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-orange-500 bg-white rounded-full p-3 shadow-lg hover:bg-orange-50"
      >
        <FiMessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center bg-orange-500 text-white rounded-t-lg">
            <h3 className="font-medium">Trợ lý ảo</h3>
            <button onClick={() => setIsOpen(false)}>
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    chat.type === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {chat.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <button
                onClick={handleSend}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;