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
          className="px-4 py-2 text-sm font-medium text-yellow-300 bg-yellow-800/40 border border-yellow-600/50 rounded-full hover:bg-yellow-700/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
