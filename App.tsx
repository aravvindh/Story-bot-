
import React, { useState } from 'react';
import type { StoryResponse } from './types';
import { generateStory } from './services/geminiService';
import Mascot from './components/Mascot';
import StoryDisplay from './components/StoryDisplay';
import QuestionInput from './components/QuestionInput';

const App: React.FC = () => {
  const [storyResponse, setStoryResponse] = useState<StoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  const handleAskQuestion = async (question: string) => {
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);
    setStoryResponse(null);
    setShowWelcome(false);

    try {
      const response = await generateStory(question);
      setStoryResponse(response);
    } catch (err) {
      setError('Oops! My circuits got tangled. Could you try asking again?');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-blue-400 text-gray-800 p-4 flex flex-col items-center overflow-hidden">
      <header className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16">
          <Mascot isAnimating={isLoading} />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-shadow-lg">
          StoryBot's Adventure Time!
        </h1>
      </header>

      <main className="w-full max-w-2xl flex-grow flex flex-col">
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex-grow flex flex-col gap-4">
          {showWelcome && (
             <div className="text-center p-4">
                <h2 className="text-2xl font-bold text-sky-700 mb-2">Hello friend!</h2>
                <p className="text-gray-600">I'm StoryBot! What are you curious about today? Ask me anything, and I'll tell you a story about it!</p>
             </div>
          )}
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 p-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400"></div>
              <p className="text-lg font-semibold text-sky-700 animate-pulse">Thinking up a wonderful story for you...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
              <p className="font-bold">Oh no!</p>
              <p>{error}</p>
            </div>
          )}
          {storyResponse && !isLoading && (
            <StoryDisplay story={storyResponse.story} example={storyResponse.example} />
          )}
        </div>
        <div className="mt-auto pt-4">
          <QuestionInput onSubmit={handleAskQuestion} isLoading={isLoading} />
        </div>
      </main>

      <footer className="text-center text-white/80 mt-6 text-sm">
        <p>Made with curiosity and sparkles ✨</p>
      </footer>
    </div>
  );
};

export default App;
