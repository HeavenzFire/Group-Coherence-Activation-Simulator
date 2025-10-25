
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/80 hover:border-slate-600 ${className}`}>
      {children}
    </div>
  );
};
