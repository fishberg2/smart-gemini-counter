import React, { useState, useCallback } from 'react';
import { Plus, Minus, RotateCcw, Sparkles } from 'lucide-react';
import { CounterDisplay } from './components/CounterDisplay';
import { Button } from './components/Button';
import { HistoryList } from './components/HistoryList';
import { AIFactCard } from './components/AIFactCard';
import { ActionType, HistoryItem, AIFactResponse } from './types';
import { generateNumberFact } from './services/geminiService';

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [aiData, setAiData] = useState<AIFactResponse | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | undefined>(undefined);

  const addToHistory = (action: ActionType, newValue: number) => {
    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      action,
      value: newValue,
      timestamp: new Date(),
    };
    // Keep last 10 items
    setHistory(prev => [newItem, ...prev].slice(0, 10));
  };

  const handleIncrement = () => {
    const newValue = count + 1;
    setCount(newValue);
    addToHistory(ActionType.INCREMENT, newValue);
  };

  const handleDecrement = () => {
    const newValue = count - 1;
    setCount(newValue);
    addToHistory(ActionType.DECREMENT, newValue);
  };

  const handleReset = () => {
    setCount(0);
    addToHistory(ActionType.RESET, 0);
    setAiData(null); // Clear AI data on reset
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleAskGemini = useCallback(async () => {
    setIsAiLoading(true);
    setAiError(undefined);
    setAiData(null); // Clear previous card while loading new one

    try {
      const data = await generateNumberFact(count);
      setAiData(data);
    } catch (err) {
      setAiError("Failed to connect to Gemini. Try again later.");
    } finally {
      setIsAiLoading(false);
    }
  }, [count]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
            Smart Counter
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Count things. Learn things. Powered by Gemini.
          </p>
        </header>

        {/* Main Card */}
        <main className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
           {/* Decorative background blob */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>

          <CounterDisplay count={count} />

          {/* Controls */}
          <div className="grid grid-cols-3 gap-4 mt-8 mb-8 max-w-md mx-auto">
            <Button 
              variant="secondary" 
              onClick={handleDecrement}
              aria-label="Decrease count"
              className="aspect-square sm:aspect-auto"
            >
              <Minus size={24} />
            </Button>
            
            <Button 
              variant="primary" 
              onClick={handleIncrement}
              aria-label="Increase count"
              className="aspect-square sm:aspect-auto"
            >
              <Plus size={28} />
            </Button>

            <Button 
              variant="danger" 
              onClick={handleReset}
              aria-label="Reset count"
              className="aspect-square sm:aspect-auto"
            >
              <RotateCcw size={20} />
            </Button>
          </div>

          {/* AI Feature Button */}
          <div className="flex justify-center mb-6">
             <Button 
                variant="ai" 
                onClick={handleAskGemini} 
                disabled={isAiLoading}
                icon={<Sparkles size={18} />}
                className="w-full max-w-md"
             >
                {isAiLoading ? 'Thinking...' : `Tell me about ${count}`}
             </Button>
          </div>

          {/* AI Result Area */}
          <AIFactCard 
            data={aiData} 
            isLoading={isAiLoading} 
            error={aiError} 
            onClose={() => setAiData(null)}
          />

          {/* History */}
          <HistoryList history={history} onClear={handleClearHistory} />

        </main>

        {/* Footer */}
        <footer className="text-center mt-8 text-slate-600 text-xs">
          <p>&copy; {new Date().getFullYear()} Smart Counter App. All counts reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;