export const STANDARD_GUITAR_TUNING = ["E", "A", "D", "G", "B", "E"] as const;
export const STANDARD_BASS_4_TUNING = ["E", "A", "D", "G"] as const;

export type FretNote = {
  stringIndex: number;
  stringName: string;
  fret: number;
  note: string;
  finger: number;
};

export const A_MINOR_PENTATONIC_BOX_1: FretNote[] = [
  { stringIndex: 5, stringName: "Low E", fret: 5, note: "A", finger: 1 },
  { stringIndex: 5, stringName: "Low E", fret: 8, note: "C", finger: 4 },
  { stringIndex: 4, stringName: "A", fret: 5, note: "D", finger: 1 },
  { stringIndex: 4, stringName: "A", fret: 7, note: "E", finger: 3 },
  { stringIndex: 3, stringName: "D", fret: 5, note: "G", finger: 1 },
  { stringIndex: 3, stringName: "D", fret: 7, note: "A", finger: 3 },
  { stringIndex: 2, stringName: "G", fret: 5, note: "C", finger: 1 },
  { stringIndex: 2, stringName: "G", fret: 7, note: "D", finger: 3 },
  { stringIndex: 1, stringName: "B", fret: 5, note: "E", finger: 1 },
  { stringIndex: 1, stringName: "B", fret: 8, note: "G", finger: 4 },
  { stringIndex: 0, stringName: "High E", fret: 5, note: "A", finger: 1 },
  { stringIndex: 0, stringName: "High E", fret: 8, note: "C", finger: 4 }
];

export const LEFT_HANDED_DIAGRAM = {
  headstockSide: "left",
  bodySide: "right",
  fretColumns: [8, 7, 6, 5],
  stringsTopToBottom: ["High E", "B", "G", "D", "A", "Low E"]
} as const;

export function getAscendingPattern(): FretNote[] {
  return [...A_MINOR_PENTATONIC_BOX_1];
}

export function getNoteAt(stringName: string, fret: number): FretNote | undefined {
  return A_MINOR_PENTATONIC_BOX_1.find(
    item => item.stringName === stringName && item.fret === fret
  );
}