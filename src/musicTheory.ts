export const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"] as const;

export const STANDARD_GUITAR_TUNING = ["E", "A", "D", "G", "B", "E"] as const;
export const STANDARD_BASS_4_TUNING = ["E", "A", "D", "G"] as const;

export type Instrument = "guitar" | "bass";
export type FretNote = {
  stringIndex: number;
  stringName: string;
  fret: number;
  note: string;
  finger: number;
};

export const SCALE_DEFINITIONS = {
  "Major": { intervals: [0, 2, 4, 5, 7, 9, 11], formula: "1  2  3  4  5  6  7" },
  "Natural minor": { intervals: [0, 2, 3, 5, 7, 8, 10], formula: "1  2  ♭3  4  5  ♭6  ♭7" },
  "Major pentatonic": { intervals: [0, 2, 4, 7, 9], formula: "1  2  3  5  6" },
  "Minor pentatonic": { intervals: [0, 3, 5, 7, 10], formula: "1  ♭3  4  5  ♭7" },
  "Blues": { intervals: [0, 3, 5, 6, 7, 10], formula: "1  ♭3  4  ♭5  5  ♭7" },
  "Dorian": { intervals: [0, 2, 3, 5, 7, 9, 10], formula: "1  2  ♭3  4  5  6  ♭7" },
  "Phrygian": { intervals: [0, 1, 3, 5, 7, 8, 10], formula: "1  ♭2  ♭3  4  5  ♭6  ♭7" },
  "Lydian": { intervals: [0, 2, 4, 6, 7, 9, 11], formula: "1  2  3  ♯4  5  6  7" },
  "Mixolydian": { intervals: [0, 2, 4, 5, 7, 9, 10], formula: "1  2  3  4  5  6  ♭7" },
  "Locrian": { intervals: [0, 1, 3, 5, 6, 8, 10], formula: "1  ♭2  ♭3  4  ♭5  ♭6  ♭7" }
} as const;

export type ScaleName = keyof typeof SCALE_DEFINITIONS;

export const CHORD_DEFINITIONS = {
  "Major": { intervals: [0, 4, 7], formula: "1  3  5" },
  "Minor": { intervals: [0, 3, 7], formula: "1  ♭3  5" },
  "Power chord": { intervals: [0, 7], formula: "1  5" },
  "Diminished": { intervals: [0, 3, 6], formula: "1  ♭3  ♭5" },
  "Augmented": { intervals: [0, 4, 8], formula: "1  3  ♯5" },
  "Sus2": { intervals: [0, 2, 7], formula: "1  2  5" },
  "Sus4": { intervals: [0, 5, 7], formula: "1  4  5" },
  "Major 7": { intervals: [0, 4, 7, 11], formula: "1  3  5  7" },
  "Minor 7": { intervals: [0, 3, 7, 10], formula: "1  ♭3  5  ♭7" },
  "Dominant 7": { intervals: [0, 4, 7, 10], formula: "1  3  5  ♭7" },
  "Minor 7♭5": { intervals: [0, 3, 6, 10], formula: "1  ♭3  ♭5  ♭7" }
} as const;

export type ChordName = keyof typeof CHORD_DEFINITIONS;

export function noteToPitchClass(note: string): number {
  const normalized = note.replace("♯", "#").replace("♭", "b");
  const aliases: Record<string, number> = {
    C: 0, "B#": 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3,
    E: 4, Fb: 4, "E#": 5, F: 5, "F#": 6, Gb: 6,
    G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10,
    B: 11, Cb: 11
  };
  return aliases[normalized] ?? 0;
}

export function getNoteName(pitchClass: number): string {
  return NOTE_NAMES[((pitchClass % 12) + 12) % 12];
}

export function getScaleNotes(root: string, scale: ScaleName): string[] {
  const rootPitch = noteToPitchClass(root);
  return SCALE_DEFINITIONS[scale].intervals.map(interval => getNoteName(rootPitch + interval));
}

export function getChordNotes(root: string, chord: ChordName): string[] {
  const rootPitch = noteToPitchClass(root);
  return CHORD_DEFINITIONS[chord].intervals.map(interval => getNoteName(rootPitch + interval));
}

export function getFretNote(openString: string, fret: number): string {
  return getNoteName(noteToPitchClass(openString) + fret);
}

export function getPitchClasses(notes: string[]): number[] {
  return notes.map(noteToPitchClass);
}

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
  fretColumns: Array.from({ length: 13 }, (_, index) => 12 - index),
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
