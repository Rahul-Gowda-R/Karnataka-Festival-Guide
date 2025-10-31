import React from 'react';
import { Message, Role } from '../types';
import FormattedContent from './FormattedContent';

interface ChatBubbleProps {
  message: Message;
}

const UserIcon = () => (
  <div className="w-8 h-8 rounded-full bg-[#CD202C] flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
    U
  </div>
);

const BotIcon = () => (
    <div className="w-8 h-8 rounded-full bg-[#FFCC00] flex items-center justify-center font-bold text-[#CD202C] text-sm flex-shrink-0">
      KFG
    </div>
);


const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  const bubbleClasses = isUser
    ? 'bg-[#CD202C] text-white'
    : 'bg-yellow-50 text-black border border-yellow-200';
  
  const layoutClasses = isUser ? 'justify-end' : 'justify-start';

  // Render nothing if the bot message is empty (during initial streaming)
  if (!isUser && !message.content) {
    return null;
  }
  
  return (
    <div className={`flex items-start gap-3 my-4 ${layoutClasses}`}>
      {!isUser && <BotIcon />}
      <div className={`max-w-md md:max-w-2xl p-4 rounded-xl shadow-sm ${bubbleClasses}`}>
        <div className="leading-relaxed">
           <FormattedContent content={message.content} />
        </div>
      </div>
       {isUser && <UserIcon />}
    </div>
  );
};

export default ChatBubble;