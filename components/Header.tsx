
import React from 'react';

interface HeaderProps {
  onReset: () => void;
  currentSubject?: string;
}

const Header: React.FC<HeaderProps> = ({ onReset, currentSubject }) => {
  return (
    <header className="sticky top-0 z-10 bg-[#008751] text-[#FCD116] shadow-md px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-[#FCD116] text-[#008751] w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-inner">
          UG
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">CBC Assessment</h1>
          <p className="text-xs text-white opacity-80">
            {currentSubject ? `Facilitator: ${currentSubject}` : 'Select a Subject'}
          </p>
        </div>
      </div>
      
      {currentSubject && (
        <button 
          onClick={onReset}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm active:scale-95"
        >
          Reset
        </button>
      )}
    </header>
  );
};

export default Header;
