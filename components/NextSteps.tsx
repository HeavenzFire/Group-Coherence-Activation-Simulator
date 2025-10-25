
import React from 'react';
import { Card } from './Card';
import { BeakerIcon, NetworkIcon, NoiseIcon, ProtocolIcon, TargetIcon } from './icons/Icons';

const steps = [
  {
    icon: <BeakerIcon />,
    title: 'Model Human Resonance',
    description: 'Integrate a cardio-respiratory transfer function H(f) to accurately model physiological resonance, ensuring 6 bpm pacing demonstrates a clear advantage over other frequencies.',
  },
  {
    icon: <NetworkIcon />,
    title: 'Heterogeneous Couplings',
    description: 'Replace the single coupling constant (K) with a matrix (Kij) to simulate subgroup synchronization and mergers, reflecting more realistic collective alignment dynamics.',
  },
  {
    icon: <NoiseIcon />,
    title: 'Stress-Test Robustness',
    description: 'Introduce colored noise and random attentional lapses into the model to measure the robustness of the coherence parameter (r) under non-ideal conditions.',
  },
  {
    icon: <ProtocolIcon />,
    title: 'Build Protocol Bridge',
    description: 'Develop a tool to export turnkey session protocols, including individually tuned breath cues, amplitude-modulated audio, and a full suite of metrics for empirical testing.',
  },
  {
    icon: <TargetIcon />,
    title: 'Set Rigorous Outcome Bar',
    description: 'Pre-register success criteria: demonstrate statistically significant superiority of resonant breathing (RB) and 40 Hz AM audio (A-40) on key biometrics. We adapt the model, not reality.',
  },
];


export const NextSteps: React.FC = () => {
  return (
    <section id="next-steps">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-100">Next Iterations: From Vibes to Validation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className="bg-slate-700 p-3 rounded-full mr-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-100 flex-1">{index + 1}. {step.title}</h3>
            </div>
            <p className="text-slate-400 text-sm flex-grow">
              {step.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};
