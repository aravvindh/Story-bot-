import React, { useState, useEffect } from 'react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const placeholders = [
  "Why do stars twinkle?",
  "How do bees make honey?",
  "Why is the sea salty?",
  "What makes a rainbow?",
  "Why do we dream?",
];

const QuestionInput: React.FC<QuestionInputProps> = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState('');
  const [placeholder, setPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(prev => {
        const currentIndex = placeholders.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && question.trim()) {
      onSubmit(question);
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 pl-6 pr-36 text-lg bg-white/80 rounded-full shadow-inner focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 resize-none h-16"
        rows={1}
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <button
        type="submit"
        disabled={isLoading || !question.trim()}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-yellow-400 text-sky-800 font-bold w-28 h-14 flex items-center justify-center gap-2 rounded-full shadow-lg hover:bg-yellow-500 transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:opacity-70"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        <span className="text-lg">Ask!</span>
      </button>
    </form>
  );
};

export default QuestionInput;