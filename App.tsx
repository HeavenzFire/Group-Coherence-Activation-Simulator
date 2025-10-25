
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ResultsDashboard } from './components/ResultsDashboard';
import { NextSteps } from './components/NextSteps';
import { loadData } from './services/dataService';
import type { SimulationData } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<SimulationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const parsedData = await loadData();
        setData(parsedData);
        setError(null);
      } catch (err) {
        setError('Failed to load simulation data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-cyan"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-900 border border-red-400 text-red-200 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        </div>
      );
    }

    if (data) {
      return (
        <>
          <ResultsDashboard data={data} />
          <NextSteps />
        </>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Simulation & Analysis Platform v1.0</p>
      </footer>
    </div>
  );
};

export default App;
