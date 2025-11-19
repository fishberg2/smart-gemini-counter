import React from 'react';
import { HistoryItem, ActionType } from '../types';
import { Clock, RotateCcw } from 'lucide-react';

interface HistoryListProps {
  history: HistoryItem[];
  onClear: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-8 border-t border-slate-800 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
          <Clock size={14} /> Recent History
        </h3>
        <button 
          onClick={onClear}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          <RotateCcw size={12} /> Clear
        </button>
      </div>
      
      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {history.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-sm bg-slate-800/40 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${
                item.action === ActionType.INCREMENT ? 'bg-green-500' :
                item.action === ActionType.DECREMENT ? 'bg-amber-500' :
                'bg-red-500'
              }`} />
              <span className="text-slate-300 font-medium">
                {item.action === ActionType.INCREMENT ? 'Increased' :
                 item.action === ActionType.DECREMENT ? 'Decreased' : 'Reset'}
              </span>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-slate-100 font-bold">{item.value}</span>
               <span className="text-slate-500 text-xs tabular-nums">
                 {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
               </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};