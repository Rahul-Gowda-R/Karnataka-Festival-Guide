import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Message, Role } from './types';
import { SYSTEM_INSTRUCTION, INITIAL_GREETING, QUICK_REPLIES } from './constants';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import QuickReplies from './components/QuickReplies';

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
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showQuickReplies, setShowQuickReplies] = useState<boolean>(true);
  const [chipOptions, setChipOptions] = useState<string[] | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatSession(getChatSession());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading, chipOptions]);

  const handleSendMessage = async (messageText: string) => {
    if (isLoading || !messageText.trim() || !chatSession) return;

    // Hide all interactive elements when a message is sent
    setIsLoading(true);
    if (showQuickReplies) setShowQuickReplies(false);
    if (chipOptions) setChipOptions(null);

    const userMessage: Message = { role: Role.USER, content: messageText };
    setMessages(prev => [...prev, userMessage]);

    // Add a placeholder for streaming
    setMessages(prev => [...prev, { role: Role.MODEL, content: '' }]);
    
    let streamedText = '';
    try {
      const stream = await chatSession.sendMessageStream({ message: messageText });
      
      for await (const chunk of stream) {
        streamedText += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = streamedText;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: Role.MODEL,
        content: "Sorry, I encountered an error. Please try again. ಕ್ಷಮಿಸಿ, ದೋಷ ಕಂಡುಬಂದಿದೆ.",
      };
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = errorMessage;
        return newMessages;
    });
    } finally {
      setIsLoading(false);
      
      // After the bot responds, parse the text for chips JSON
      const jsonRegex = /{\s*"type":\s*"chips"[\s\S]*}/;
      const match = streamedText.match(jsonRegex);
      let displayText = streamedText;
      let newChips = null;

      if (match && match[0]) {
          try {
              const parsed = JSON.parse(match[0]);
              if (parsed.type === 'chips' && Array.isArray(parsed.options)) {
                  displayText = streamedText.replace(jsonRegex, '').trim();
                  newChips = parsed.options;
              }
          } catch (e) {
              console.error("Failed to parse chips JSON from model response:", e);
          }
      }
      
      // Update the final message content with only the display text
      setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg && lastMsg.role === Role.MODEL) {
            lastMsg.content = displayText;
          }
          return newMessages;
      });

      // Set the new chips to be displayed
      if (newChips) {
          setChipOptions(newChips);
      }
    }
  };
  
  const lastMessage = messages[messages.length - 1];
  const showTypingIndicator = isLoading && lastMessage?.role === Role.MODEL && !lastMessage.content;

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans" style={{ backgroundImage: `radial-gradient(circle at top right, rgba(220, 38, 38, 0.1), transparent 40%), radial-gradient(circle at bottom left, rgba(234, 179, 8, 0.1), transparent 40%)` }}>
      <header className="p-4 text-center border-b border-yellow-600/30 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400 shrink-0">
        <h1 className="text-2xl md:text-3xl font-bold">Karnataka Festival Guide</h1>
        <p className="text-sm text-gray-400">Your AI guide to the land of celebrations</p>
      </header>

      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {showTypingIndicator && (
          <div className="flex justify-start items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">KFG</div>
              <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
              </div>
          </div>
        )}
      </main>
      
      <div className="shrink-0">
        {showQuickReplies && (
            <QuickReplies
                replies={QUICK_REPLIES}
                onQuickReplyClick={handleSendMessage}
                disabled={isLoading}
            />
        )}
        {chipOptions && !isLoading && (
            <QuickReplies
                replies={chipOptions}
                onQuickReplyClick={handleSendMessage}
                disabled={isLoading}
            />
        )}
      </div>

      <footer className="sticky bottom-0 shrink-0">
        <ChatInput
          userInput={userInput}
          setUserInput={setUserInput}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </footer>
    </div>
  );
};

export default App;