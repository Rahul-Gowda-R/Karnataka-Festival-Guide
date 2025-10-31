import React from 'react';

interface ChatInputProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const SendIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);

const ChatInput: React.FC<ChatInputProps> = ({ userInput, setUserInput, onSendMessage, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() && !isLoading) {
      onSendMessage(userInput);
      setUserInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask about Karnataka's festivals..."
        disabled={isLoading}
        className="flex-grow p-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CD202C] transition-all w-full"
      />
      <button
        type="submit"
        disabled={isLoading || !userInput.trim()}
        className="p-3 bg-[#CD202C] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:bg-red-700 flex items-center justify-center shrink-0"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <SendIcon />
        )}
      </button>
    </form>
  );
};

export default ChatInput;