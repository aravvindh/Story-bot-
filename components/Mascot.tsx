import React from 'react';

interface MascotProps {
  isAnimating: boolean;
}

const Mascot: React.FC<MascotProps> = ({ isAnimating }) => {
  const animationClass = isAnimating ? 'animate-thinking' : 'animate-idle';

  return (
    <div className={`w-full h-full ${animationClass}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Body */}
        <path d="M20 50 C20 35, 80 35, 80 50 L80 85 C80 95, 20 95, 20 85 Z" fill="#4A90E2"/>
        <path d="M22 50 C22 38, 78 38, 78 50" fill="#63A4F4"/>

        {/* Antenna */}
        <line x1="50" y1="20" x2="50" y2="40" stroke="#F5A623" strokeWidth="4" strokeLinecap="round"/>
        <circle 
          cx="50" 
          cy="15" 
          r="6" 
          fill="#F8E71C" 
          className={isAnimating ? 'animate-pulse' : ''}
          style={{ animationDuration: '0.5s', filter: isAnimating ? 'url(#glow)' : 'none' }}
        />
        
        {/* Eyes */}
        <g>
          <circle cx="38" cy="62" r="10" fill="white"/>
          <circle cx="38" cy="62" r="5" fill="#333" className="animate-wiggle" style={{ animationDelay: '0.2s', animationDuration: '3s' }}/>
          <circle cx="38" cy="60" r="2" fill="white"/>
        </g>
        <g>
          <circle cx="62" cy="62" r="10" fill="white"/>
          <circle cx="62" cy="62" r="5" fill="#333" className="animate-wiggle" style={{ animationDuration: '3s' }}/>
          <circle cx="62" cy="60" r="2" fill="white"/>
        </g>
        
        {/* Cheeks */}
        <circle cx="28" cy="75" r="5" fill="#FFC0CB" opacity="0.6"/>
        <circle cx="72" cy="75" r="5" fill="#FFC0CB" opacity="0.6"/>

        {/* Smile */}
        <path d="M40 78 C45 88, 55 88, 60 78" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default Mascot;