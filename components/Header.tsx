
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10 py-4 border-b border-slate-800">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-teal">
          Group Coherence Activation
        </h1>
        <p className="text-slate-400 mt-1">First-Cut Simulation Readout</p>
      </div>
    </header>
  );
};
