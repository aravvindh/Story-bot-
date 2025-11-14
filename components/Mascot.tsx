
import React from 'react';

interface MascotProps {
  isAnimating: boolean;
}

const Mascot: React.FC<MascotProps> = ({ isAnimating }) => {
  const animationClass = isAnimating ? 'animate-bounce' : 'group-hover:animate-wiggle';

  return (
    <div className={`w-full h-full group ${animationClass}`} style={{ animationDuration: '1.5s' }}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
          {`
            @keyframes wiggle {
              0%, 100% { transform: rotate(-3deg); }
              50% { transform: rotate(3deg); }
            }
            .group:hover .animate-wiggle {
              animation: wiggle 0.5s ease-in-out infinite;
            }
          `}
        </style>
        {/* Body */}
        <rect x="20" y="40" width="60" height="45" rx="15" fill="#4A90E2"/>
        {/* Antenna */}
        <line x1="50" y1="20" x2="50" y2="40" stroke="#F5A623" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="50" cy="15" r="5" fill="#F8E71C"/>
        {/* Eyes */}
        <circle cx="40" cy="60" r="10" fill="white"/>
        <circle cx="40" cy="60" r="4" fill="#333"/>
        <circle cx="60" cy="60" r="10" fill="white"/>
        <circle cx="60" cy="60" r="4" fill="#333"/>
        {/* Smile */}
        <path d="M40 75 Q50 85 60 75" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default Mascot;
