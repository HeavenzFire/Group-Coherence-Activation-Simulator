
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { SimulationData } from '../types';
import { Card } from './Card';

interface ResultsDashboardProps {
  data: SimulationData;
}

const chartLines = {
  lowFrequency: [
    { key: '6_bpm_resonance', name: '6-bpm Resonance', color: '#22d3ee' },
    { key: '18_s_breath', name: '18-s Breath', color: '#a78bfa' },
  ],
  gamma: [
    { key: '40_Hz_envelope', name: '40 Hz Envelope Driver', color: '#34d399' },
    { key: '528_Hz_pure', name: '528 Hz Pure Tone', color: '#f87171' },
  ]
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-700/80 backdrop-blur-sm p-3 border border-slate-600 rounded-md shadow-lg">
        <p className="label font-bold text-slate-200">{`Time: ${label}`}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="intro">
            {`${p.name}: ${p.value.toFixed(3)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data }) => {
  return (
    <section id="results" className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-100">Simulation Results</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <h3 className="text-xl font-semibold mb-1 text-brand-cyan">Low-Frequency System</h3>
          <p className="text-sm text-slate-400 mb-4">"Heart/Breath" Band Coherence</p>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={data.lowFrequencyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis domain={[0, 1]} stroke="#94a3b8" label={{ value: 'r(t)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {chartLines.lowFrequency.map(line => (
                  <Line key={line.key} type="monotone" dataKey={line.key} name={line.name} stroke={line.color} strokeWidth={2} dot={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-slate-300 space-y-2">
            <p><strong className="font-semibold text-white">Key Finding:</strong> Group coherence (r(t)) rapidly approaches 1 under moderate coupling (K).</p>
            <p className="text-sm">The strong social coupling and shared pacing in the model drive high phase-locking, making the difference between the 6-bpm and 18-s breath protocols subtle in this simplified mean-field view.</p>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-xl font-semibold mb-1 text-emerald-400">Gamma System</h3>
          <p className="text-sm text-slate-400 mb-4">"Brain-ish" Band Coherence</p>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={data.gammaData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis domain={[0, 1]} stroke="#94a3b8" label={{ value: 'r(t)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {chartLines.gamma.map(line => (
                  <Line key={line.key} type="monotone" dataKey={line.key} name={line.name} stroke={line.color} strokeWidth={2} dot={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-slate-300 space-y-2">
             <p><strong className="font-semibold text-white">Key Finding:</strong> A 40 Hz envelope driver significantly increases coherence, while a pure 528 Hz tone has a negligible effect.</p>
             <p className="text-sm">This aligns with neurophysiology: the nervous system responds to modulation rates and envelopes, not the specific carrier frequency. The "sacred" carrier is less important than the temporal structure.</p>
          </div>
        </Card>
      </div>
    </section>
  );
};
