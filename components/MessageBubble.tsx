
import React from 'react';
import { Message, Role } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isModel = message.role === Role.MODEL;

  return (
    <div className={`flex ${isModel ? 'justify-start' : 'justify-end'} mb-4 animate-in slide-in-from-bottom-2`}>
      <div 
        className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed
          ${isModel 
            ? 'bg-white text-gray-800 rounded-tl-none border-l-4 border-[#008751]' 
            : 'bg-[#008751] text-white rounded-tr-none'
          }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        <div className={`text-[10px] mt-1.5 opacity-60 ${isModel ? 'text-gray-500' : 'text-yellow-100'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
