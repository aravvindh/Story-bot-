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
    <div className="relative min-h-screen bg-gradient-to-b from-cyan-300 via-sky-400 to-indigo-500 text-gray-800 p-4 flex flex-col items-center overflow-hidden">
       {/* Animated Clouds */}
      <div className="cloud slow" style={{ width: '200px', height: '60px', top: '10%', left: '-50px' }}></div>
      <div className="cloud fast" style={{ width: '150px', height: '45px', top: '20%', right: '-60px' }}></div>
      <div className="cloud slow" style={{ width: '250px', height: '75px', bottom: '15%', left: '5%' }}></div>
      <div className="cloud fast" style={{ width: '120px', height: '40px', bottom: '5%', right: '10%' }}></div>
      
      <header className="flex items-center gap-4 mb-6 z-10">
        <div className="w-20 h-20">
          <Mascot isAnimating={isLoading} />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>
          StoryBot's Adventure
        </h1>
      </header>

      <main className="w-full max-w-2xl flex-grow flex flex-col z-10">
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-2xl flex-grow flex flex-col gap-4">
          {showWelcome && (
             <div className="text-center p-4 animate-pop-in">
                <h2 className="text-3xl font-bold text-sky-700 mb-2">Hello friend!</h2>
                <p className="text-gray-700 text-lg">I'm StoryBot! What are you curious about today? Ask me anything, and I'll tell you a story about it!</p>
             </div>
          )}
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 p-8">
              <div className="relative w-24 h-16">
                <div className="absolute -bottom-2 w-full h-full bg-white rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -bottom-2 w-20 h-14 left-2 bg-white rounded-full opacity-80 animate-pulse delay-75"></div>
                 <p className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-sky-600 animate-pulse">...</p>
              </div>
              <p className="text-lg font-semibold text-sky-800/90 mt-4">Thinking up a wonderful story for you...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border-l-8 border-red-500 text-red-700 p-4 rounded-lg shadow-lg animate-pop-in" role="alert">
              <p className="font-bold text-xl">Oh no!</p>
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

      <footer className="text-center text-white/80 mt-6 text-sm z-10">
        <p>Made with curiosity and sparkles ✨</p>
      </footer>
    </div>
  );
};

export default App;