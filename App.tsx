
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import SubjectSelector from './components/SubjectSelector';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import { Subject, Message, Role } from './types';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSelectSubject = async (subject: Subject) => {
    setSelectedSubject(subject);
    setIsTyping(true);
    
    try {
      const welcomeText = await geminiService.startNewChat(subject.name);
      const welcomeMsg: Message = {
        id: Date.now().toString(),
        role: Role.MODEL,
        text: welcomeText,
        timestamp: new Date()
      };
      setMessages([welcomeMsg]);
    } catch (error) {
      console.error("Failed to start chat:", error);
      alert("Something went wrong initializing the facilitator. Please try again.");
      setSelectedSubject(null);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const responseText = await geminiService.sendMessage(text);
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: "Oh no! I lost my connection for a moment. Could you please send that again?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to end this session and start a new subject? Your progress will not be saved.")) {
      setSelectedSubject(null);
      setMessages([]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Header 
        onReset={handleReset} 
        currentSubject={selectedSubject?.name} 
      />

      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        {!selectedSubject ? (
          <SubjectSelector onSelect={handleSelectSubject} />
        ) : (
          <div className="p-4 sm:p-6 max-w-3xl mx-auto min-h-full flex flex-col justify-end">
            <div ref={scrollRef} className="pb-4">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border-l-4 border-[#008751] shadow-sm flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {selectedSubject && (
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      )}

      {/* Ugandan Theme Footer Decoration */}
      <div className="h-1 flex w-full">
        <div className="flex-1 bg-black"></div>
        <div className="flex-1 bg-[#FCD116]"></div>
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-[#FCD116]"></div>
        <div className="flex-1 bg-black"></div>
      </div>
    </div>
  );
};

export default App;
