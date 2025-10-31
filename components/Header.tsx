import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="shrink-0 bg-[#CD202C] p-3 text-center shadow-md">
        <h1 className="text-xl font-bold text-white">
            Karnataka Guide Bot 
        </h1>
        <p className="text-xs text-yellow-200/90 kannada-font">ಸಂಸ್ಕೃತಿ, ಸಂಭ್ರಮ ಮತ್ತು ಸೌಂದರ್ಯ — ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ!</p>
    </header>
  );
};

export default Header;