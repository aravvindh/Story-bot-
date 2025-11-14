import React, { useState, useEffect } from 'react';

interface StoryDisplayProps {
  story: string;
  example: string;
}

const AnimatedText: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        setDisplayedText(''); // Reset on text change
        if (text) {
            let i = 0;
            const intervalId = setInterval(() => {
                setDisplayedText(text.substring(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(intervalId);
                }
            }, 30); // Speed of typing animation
            return () => clearInterval(intervalId);
        }
    }, [text]);

    // Use a non-breaking space to prevent layout shift when empty
    return <p className="text-gray-700 text-lg leading-relaxed">{displayedText || '\u00A0'}<span className="animate-pulse opacity-50">|</span></p>;
};


const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, example }) => {
  const [showExample, setShowExample] = useState(false);

  useEffect(() => {
    setShowExample(false); // Reset on new story
    const storyTypingTime = story.length * 30 + 1000; // a little buffer
    const timer = setTimeout(() => {
      setShowExample(true);
    }, storyTypingTime);

    return () => clearTimeout(timer);
  }, [story]);

  return (
    <div className="space-y-8">
      <div className="relative bg-white/80 p-6 pt-8 rounded-3xl rounded-tl-lg shadow-lg animate-pop-in">
        <div className="absolute -top-5 left-4 w-14 h-14 bg-sky-400 rounded-full flex items-center justify-center text-3xl shadow-md transform rotate-[-10deg]">
          📖
        </div>
        <h3 className="text-2xl font-bold text-sky-800 mb-2 ml-16">
          Here's a Story...
        </h3>
        <AnimatedText text={story} />
      </div>

      {showExample && (
        <div className="relative bg-white/80 p-6 pt-8 rounded-3xl rounded-tr-lg shadow-lg animate-pop-in" style={{animationDelay: '0.2s'}}>
            <div className="absolute -top-5 right-4 w-14 h-14 bg-green-400 rounded-full flex items-center justify-center text-3xl shadow-md transform rotate-[10deg]">
                💡
            </div>
          <h3 className="text-2xl font-bold text-green-800 mb-2 text-right mr-16">
            For Example...
          </h3>
           <AnimatedText text={example} />
        </div>
      )}
    </div>
  );
};

export default StoryDisplay;