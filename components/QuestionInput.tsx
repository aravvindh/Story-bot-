
import React, { useState } from 'react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState('');

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
        placeholder="Why is the sky blue?"
        className="w-full p-4 pr-28 text-lg bg-white rounded-full shadow-inner focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-shadow duration-300 resize-none h-16"
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
        disabled={isLoading}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-yellow-400 text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-yellow-500 transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
      >
        Ask!
      </button>
    </form>
  );
};

export default QuestionInput;
