import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Message, Role } from './types';
import { SYSTEM_INSTRUCTION, INITIAL_GREETING, QUICK_REPLIES } from './constants';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import QuickReplies from './components/QuickReplies';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

const getChatSession = (): Chat => {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
};


const App: React.FC = () => {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showQuickReplies, setShowQuickReplies] = useState<boolean>(true);
  const [chipOptions, setChipOptions] = useState<string[] | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading, chipOptions]);

  const handleStartChat = () => {
    if (!chatSession) {
      setChatSession(getChatSession());
    }
    setShowChat(true);
  };

  const handleSendMessage = async (messageText: string) => {
    if (isLoading || !messageText.trim() || !chatSession) return;

    setIsLoading(true);
    if (showQuickReplies) setShowQuickReplies(false);
    if (chipOptions) setChipOptions(null);

    const userMessage: Message = { role: Role.USER, content: messageText };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Add a placeholder for the model's response to attach the streaming text to.
    const modelMessagePlaceholder: Message = { role: Role.MODEL, content: '' };
    setMessages(prevMessages => [...prevMessages, modelMessagePlaceholder]);

    try {
      const stream = await chatSession.sendMessageStream({ message: messageText });

      let modelResponse = '';
      for await (const chunk of stream) {
        modelResponse += chunk.text;
        // Update the content of the last message (the placeholder) in real-time
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], content: modelResponse };
          return newMessages;
        });
      }

      // After streaming, parse for JSON chips
      const finalResponse = modelResponse.trim();
      const jsonMatch = finalResponse.match(/(\{[\s\S]*\})$/);
      let contentWithoutJson = finalResponse;
      let options: string[] | null = null;

      if (jsonMatch) {
        try {
          const parsedJson = JSON.parse(jsonMatch[1]);
          if (parsedJson.type === 'chips' && Array.isArray(parsedJson.options)) {
            contentWithoutJson = finalResponse.substring(0, jsonMatch.index).trim();
            options = parsedJson.options;
          }
        } catch (e) {
          console.error("Failed to parse JSON from model response:", e);
        }
      }

      setMessages(prevMessages => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1].content = contentWithoutJson;
        return newMessages;
      });

      if (options) {
        setChipOptions(options);
      }

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { role: Role.MODEL, content: "Sorry, I encountered an error. Please try again." };
       setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = errorMessage;
          return newMessages;
       });
    } finally {
      setIsLoading(false);
    }
  };

  if (!showChat) {
    return (
      <>
        <LandingPage onStartChat={handleStartChat} />
        <button
          onClick={handleStartChat}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#CD202C] text-white p-4 rounded-full shadow-2xl hover:bg-[#FFCC00] hover:text-black focus:outline-none focus:ring-4 focus:ring-red-300 transition-all transform hover:scale-110 z-50"
          aria-label="Open chat"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        </button>
      </>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FFFBEB]">
      <Header />
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
         {isLoading && <div className="flex justify-start pl-12"><div className="w-16 h-8 bg-yellow-100 border border-yellow-200 rounded-xl flex items-center justify-center"><div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse mx-1 delay-75"></div><div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse mx-1 delay-150"></div><div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse mx-1 delay-300"></div></div></div>}
      </div>
      <div className="shrink-0 p-2 md:p-4 bg-white/50 backdrop-blur-sm border-t border-yellow-200">
        {chipOptions && !isLoading && <QuickReplies replies={chipOptions} onQuickReplyClick={handleSendMessage} disabled={isLoading} />}
        {showQuickReplies && !isLoading && <QuickReplies replies={QUICK_REPLIES} onQuickReplyClick={handleSendMessage} disabled={isLoading} />}
        <ChatInput userInput={userInput} setUserInput={setUserInput} onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;