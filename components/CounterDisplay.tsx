import React, { useEffect, useState } from 'react';

interface CounterDisplayProps {
  count: number;
}

export const CounterDisplay: React.FC<CounterDisplayProps> = ({ count }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="flex flex-col items-center justify-center py-12 relative">
      <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className={`relative transition-transform duration-300 ${animate ? 'scale-110 text-blue-400' : 'scale-100 text-white'}`}>
        <span className="text-9xl font-black tracking-tighter select-none tabular-nums drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          {count}
        </span>
      </div>
      
      <p className="mt-4 text-slate-400 uppercase tracking-widest text-xs font-semibold">
        Current Count
      </p>
    </div>
  );
};