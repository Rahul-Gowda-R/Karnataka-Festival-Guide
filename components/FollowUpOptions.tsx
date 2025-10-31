import React from 'react';

interface FollowUpOption {
  label: string;
  prompt: string;
  icon: string;
}

interface FollowUpOptionsProps {
  festivalName: string;
  options: FollowUpOption[];
  onOptionClick: (prompt: string) => void;
  disabled: boolean;
}

const FollowUpOptions: React.FC<FollowUpOptionsProps> = ({ festivalName, options, onOptionClick, disabled }) => {
  return (
    <div className="flex flex-col items-center gap-3 my-4 px-4 shrink-0">
        <p className="text-gray-300 text-center mb-2 text-sm">What would you like to explore next about {festivalName}?</p>
        <div className="flex flex-wrap gap-2 justify-center">
            {options.map((option, index) => (
                <button
                key={index}
                onClick={() => onOptionClick(option.prompt.replace('{{festival_name}}', festivalName))}
                disabled={disabled}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-200 bg-red-800/40 border border-red-600/50 rounded-full hover:bg-red-700/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                <span>{option.icon}</span>
                <span>{option.label}</span>
                </button>
            ))}
        </div>
    </div>
  );
};

export default FollowUpOptions;
