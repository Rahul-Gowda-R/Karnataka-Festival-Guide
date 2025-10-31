import React from 'react';
import { Message, Role } from '../types';
import FormattedContent from './FormattedContent';

interface ChatBubbleProps {
  message: Message;
}

const UserIcon = () => (
  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black text-sm flex-shrink-0">
    U
  </div>
);

const BotIcon = () => (
    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
      KFG
    </div>
);


const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  const bubbleClasses = isUser
    ? 'bg-yellow-900/50 border-yellow-600/50'
    : 'bg-red-900/50 border-red-600/50';
  
  const layoutClasses = isUser ? 'justify-end' : 'justify-start';

  // Render nothing if the bot message is empty (during initial streaming)
  if (!isUser && !message.content) {
    return null;
  }
  
  return (
    <div className={`flex items-start gap-3 my-4 ${layoutClasses}`}>
      {!isUser && <BotIcon />}
      <div className={`max-w-md md:max-w-2xl p-4 rounded-xl border ${bubbleClasses}`}>
        <div className="text-gray-200 leading-relaxed">
           <FormattedContent content={message.content} />
        </div>
      </div>
       {isUser && <UserIcon />}
    </div>
  );
};

export default ChatBubble;
