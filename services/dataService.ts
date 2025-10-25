
import * as d3 from 'd3-dsv';
import type { SimulationRecord, PivotedRecord, SimulationData } from '../types';

const MOCK_CSV_DATA = `time,condition,system,coupling_K,coherence_r
0,6_bpm_resonance,low_frequency,0.5,0.1
1,6_bpm_resonance,low_frequency,0.5,0.2
2,6_bpm_resonance,low_frequency,0.5,0.35
3,6_bpm_resonance,low_frequency,0.5,0.5
4,6_bpm_resonance,low_frequency,0.5,0.65
5,6_bpm_resonance,low_frequency,0.5,0.8
6,6_bpm_resonance,low_frequency,0.5,0.9
7,6_bpm_resonance,low_frequency,0.5,0.95
8,6_bpm_resonance,low_frequency,0.5,0.97
9,6_bpm_resonance,low_frequency,0.5,0.98
10,6_bpm_resonance,low_frequency,0.5,0.98
0,18_s_breath,low_frequency,0.5,0.1
1,18_s_breath,low_frequency,0.5,0.18
2,18_s_breath,low_frequency,0.5,0.3
3,18_s_breath,low_frequency,0.5,0.45
4,18_s_breath,low_frequency,0.5,0.6
5,18_s_breath,low_frequency,0.5,0.72
6,18_s_breath,low_frequency,0.5,0.82
7,18_s_breath,low_frequency,0.5,0.88
8,18_s_breath,low_frequency,0.5,0.92
9,18_s_breath,low_frequency,0.5,0.94
10,18_s_breath,low_frequency,0.5,0.95
0,40_Hz_envelope,gamma,0.5,0.05
1,40_Hz_envelope,gamma,0.5,0.1
2,40_Hz_envelope,gamma,0.5,0.2
3,40_Hz_envelope,gamma,0.5,0.35
4,40_Hz_envelope,gamma,0.5,0.5
5,40_Hz_envelope,gamma,0.5,0.65
6,40_Hz_envelope,gamma,0.5,0.75
7,40_Hz_envelope,gamma,0.5,0.8
8,40_Hz_envelope,gamma,0.5,0.82
9,40_Hz_envelope,gamma,0.5,0.84
10,40_Hz_envelope,gamma,0.5,0.85
0,528_Hz_pure,gamma,0.5,0.05
1,528_Hz_pure,gamma,0.5,0.06
2,528_Hz_pure,gamma,0.5,0.07
3,528_Hz_pure,gamma,0.5,0.08
4,528_Hz_pure,gamma,0.5,0.1
5,528_Hz_pure,gamma,0.5,0.11
6,528_Hz_pure,gamma,0.5,0.12
7,528_Hz_pure,gamma,0.5,0.13
8,528_Hz_pure,gamma,0.5,0.14
9,528_Hz_pure,gamma,0.5,0.15
10,528_Hz_pure,gamma,0.5,0.15
`;

const parseAndPivotData = (records: SimulationRecord[]): PivotedRecord[] => {
  const groupedByTime = records.reduce((acc, record) => {
    if (!acc[record.time]) {
      acc[record.time] = { time: record.time };
    }
    acc[record.time][record.condition] = record.coherence_r;
    return acc;
  }, {} as { [time: number]: PivotedRecord });

  return Object.values(groupedByTime).sort((a, b) => a.time - b.time);
};

export const loadData = (): Promise<SimulationData> => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simulate network delay
      const parsed = d3.csvParse(MOCK_CSV_DATA, (d) => ({
        time: +d.time!,
        condition: d.condition!,
        system: d.system as 'low_frequency' | 'gamma',
        coupling_K: +d.coupling_K!,
        coherence_r: +d.coherence_r!,
      }));

      const lowFrequencyRecords = parsed.filter(r => r.system === 'low_frequency');
      const gammaRecords = parsed.filter(r => r.system === 'gamma');

      resolve({
          lowFrequencyData: parseAndPivotData(lowFrequencyRecords as SimulationRecord[]),
          gammaData: parseAndPivotData(gammaRecords as SimulationRecord[]),
      });
    }, 1000);
  });
};
