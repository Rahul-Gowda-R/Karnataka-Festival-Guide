import React from 'react';

interface QuickRepliesProps {
  replies: string[];
  onQuickReplyClick: (reply: string) => void;
  disabled: boolean;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ replies, onQuickReplyClick, disabled }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center my-4 px-4">
      {replies.map((reply, index) => (
        <button
          key={index}
          onClick={() => onQuickReplyClick(reply)}
          disabled={disabled}
          className="px-4 py-2 text-sm font-semibold text-white bg-[#CD202C] border border-[#CD202C] rounded-full hover:bg-[#FFCC00] hover:text-black hover:border-[#FFCC00] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;