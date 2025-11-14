
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

    return <p className="text-gray-700 leading-relaxed">{displayedText}<span className="animate-pulse">|</span></p>;
};


const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, example }) => {
  const [showExample, setShowExample] = useState(false);

  useEffect(() => {
    // Show example after story is likely finished typing
    const storyTypingTime = story.length * 30 + 1000; // a little buffer
    const timer = setTimeout(() => {
      setShowExample(true);
    }, storyTypingTime);

    return () => clearTimeout(timer);
  }, [story]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-sky-100/50 p-4 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold text-sky-800 mb-2 flex items-center gap-2">
          <span role="img" aria-label="storybook">📖</span> Here's a Story...
        </h3>
        <AnimatedText text={story} />
      </div>

      {showExample && (
        <div className="bg-green-100/50 p-4 rounded-xl shadow-sm animate-fade-in">
          <h3 className="text-xl font-bold text-green-800 mb-2 flex items-center gap-2">
            <span role="img" aria-label="lightbulb">💡</span> For Example...
          </h3>
           <AnimatedText text={example} />
        </div>
      )}
    </div>
  );
};

export default StoryDisplay;
