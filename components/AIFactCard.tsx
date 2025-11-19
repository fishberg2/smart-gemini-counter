import React from 'react';
import { AIFactResponse } from '../types';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIFactCardProps {
  data: AIFactResponse | null;
  isLoading: boolean;
  error?: string;
  onClose: () => void;
}

export const AIFactCard: React.FC<AIFactCardProps> = ({ data, isLoading, error, onClose }) => {
  if (!data && !isLoading && !error) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-6 animate-fade-in">
      <div className="relative bg-slate-800/50 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 shadow-xl overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-500/20 blur-xl rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-purple-400">
              <Sparkles size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Gemini Insight</span>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-lg leading-none">&times;</button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-4 space-x-3 text-slate-400">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-sm">Consulting the digital oracle...</span>
            </div>
          ) : error ? (
            <p className="text-red-400 text-sm">{error}</p>
          ) : (
            <>
              <h4 className="text-slate-200 font-medium text-lg leading-relaxed">
                {data?.fact}
              </h4>
              <div className="mt-3 flex justify-end">
                <span className="text-xs py-1 px-2 rounded bg-slate-700 text-slate-300 border border-slate-600">
                  {data?.category}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};