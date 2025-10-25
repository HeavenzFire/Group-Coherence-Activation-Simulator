
export interface SimulationRecord {
  time: number;
  condition: string;
  system: 'low_frequency' | 'gamma';
  coupling_K: number;
  coherence_r: number;
}

export interface PivotedRecord {
  time: number;
  [condition: string]: number;
}

export interface SimulationData {
    lowFrequencyData: PivotedRecord[];
    gammaData: PivotedRecord[];
}
