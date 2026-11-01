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
  "Locrian": { intervals: [0, 1, 3, 5, 6, 8, 10], formula: "1  ♭2  ♭3  4  ♭5  ♭6  ♭7" },
  "Harmonic minor": { intervals: [0, 2, 3, 5, 7, 8, 11], formula: "1  2  ♭3  4  5  ♭6  7" },
  "Melodic minor": { intervals: [0, 2, 3, 5, 7, 9, 11], formula: "1  2  ♭3  4  5  6  7" },
  "Harmonic major": { intervals: [0, 2, 4, 5, 7, 8, 11], formula: "1  2  3  4  5  ♭6  7" },
  "Minor blues": { intervals: [0, 3, 5, 6, 7, 10], formula: "1  ♭3  4  ♭5  5  ♭7" },
  "Whole tone": { intervals: [0, 2, 4, 6, 8, 10], formula: "1  2  3  ♯4  ♯5  ♭7" },
  "Diminished (whole-half)": { intervals: [0, 2, 3, 5, 6, 8, 9, 11], formula: "1  2  ♭3  4  ♭5  ♭6  6  7" },
  "Diminished (half-whole)": { intervals: [0, 1, 3, 4, 6, 7, 9, 10], formula: "1  ♭2  ♭3  3  ♯4  5  6  ♭7" },
  "Phrygian dominant": { intervals: [0, 1, 4, 5, 7, 8, 10], formula: "1  ♭2  3  4  5  ♭6  ♭7" },
  "Lydian dominant": { intervals: [0, 2, 4, 6, 7, 9, 10], formula: "1  2  3  ♯4  5  6  ♭7" },
  "Altered": { intervals: [0, 1, 3, 4, 6, 8, 10], formula: "1  ♭2  ♯2  3  ♭5  ♯5  ♭7" },
  "Double harmonic major": { intervals: [0, 1, 4, 5, 7, 8, 11], formula: "1  ♭2  3  4  5  ♭6  7" },
  "Hungarian minor": { intervals: [0, 2, 3, 6, 7, 8, 11], formula: "1  2  ♭3  ♯4  5  ♭6  7" },
  "Hungarian major": { intervals: [0, 3, 4, 6, 7, 9, 10], formula: "1  ♭3  3  ♯4  5  6  ♭7" },
  "Neapolitan minor": { intervals: [0, 1, 3, 5, 7, 8, 11], formula: "1  ♭2  ♭3  4  5  ♭6  7" },
  "Neapolitan major": { intervals: [0, 1, 3, 5, 7, 9, 11], formula: "1  ♭2  ♭3  4  5  6  7" },
  "Bebop dominant": { intervals: [0, 2, 4, 5, 7, 9, 10, 11], formula: "1  2  3  4  5  6  ♭7  7" },
  "Bebop major": { intervals: [0, 2, 4, 5, 7, 8, 9, 11], formula: "1  2  3  4  5  ♭6  6  7" },
  "Bebop Dorian": { intervals: [0, 2, 3, 4, 5, 7, 9, 10], formula: "1  2  ♭3  3  4  5  6  ♭7" },
  "Enigmatic": { intervals: [0, 1, 4, 6, 8, 10, 11], formula: "1  ♭2  3  ♯4  ♯5  ♭7  7" },
  "Prometheus": { intervals: [0, 2, 4, 6, 9, 10], formula: "1  2  3  ♯4  6  ♭7" },
  "Persian": { intervals: [0, 1, 4, 5, 6, 8, 11], formula: "1  ♭2  3  4  ♭5  ♭6  7" },
  "Hirajoshi": { intervals: [0, 2, 3, 7, 8], formula: "1  2  ♭3  5  ♭6" },
  "In Sen": { intervals: [0, 1, 5, 7, 10], formula: "1  ♭2  4  5  ♭7" },
  "Iwato": { intervals: [0, 1, 5, 6, 10], formula: "1  ♭2  4  ♭5  ♭7" },
  "Kumoi": { intervals: [0, 2, 3, 7, 9], formula: "1  2  ♭3  5  6" },
  "Egyptian": { intervals: [0, 2, 5, 7, 10], formula: "1  2  4  5  ♭7" },
  "Balinese": { intervals: [0, 1, 3, 7, 8], formula: "1  ♭2  ♭3  5  ♭6" },
  "Yo": { intervals: [0, 2, 5, 7, 9], formula: "1  2  4  5  6" },
  "Pelog (five-tone approximation)": { intervals: [0, 1, 3, 7, 8], formula: "1  ♭2  ♭3  5  ♭6" }
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
  "Minor 7♭5": { intervals: [0, 3, 6, 10], formula: "1  ♭3  ♭5  ♭7" },
  "6": { intervals: [0, 4, 7, 9], formula: "1  3  5  6" },
  "Minor 6": { intervals: [0, 3, 7, 9], formula: "1  ♭3  5  6" },
  "Add9": { intervals: [0, 4, 7, 14], formula: "1  3  5  9" },
  "Minor add9": { intervals: [0, 3, 7, 14], formula: "1  ♭3  5  9" },
  "7sus4": { intervals: [0, 5, 7, 10], formula: "1  4  5  ♭7" },
  "7♭5": { intervals: [0, 4, 6, 10], formula: "1  3  ♭5  ♭7" },
  "7♯5": { intervals: [0, 4, 8, 10], formula: "1  3  ♯5  ♭7" },
  "Major 9": { intervals: [0, 4, 7, 11, 14], formula: "1  3  5  7  9" },
  "Minor 9": { intervals: [0, 3, 7, 10, 14], formula: "1  ♭3  5  ♭7  9" },
  "Dominant 9": { intervals: [0, 4, 7, 10, 14], formula: "1  3  5  ♭7  9" },
  "Major 11": { intervals: [0, 4, 7, 11, 14, 17], formula: "1  3  5  7  9  11" },
  "Minor 11": { intervals: [0, 3, 7, 10, 14, 17], formula: "1  ♭3  5  ♭7  9  11" },
  "Dominant 11": { intervals: [0, 4, 7, 10, 14, 17], formula: "1  3  5  ♭7  9  11" },
  "Major 13": { intervals: [0, 4, 7, 11, 14, 17, 21], formula: "1  3  5  7  9  11  13" },
  "Minor 13": { intervals: [0, 3, 7, 10, 14, 17, 21], formula: "1  ♭3  5  ♭7  9  11  13" },
  "Dominant 13": { intervals: [0, 4, 7, 10, 14, 17, 21], formula: "1  3  5  ♭7  9  11  13" },
  "6/9": { intervals: [0, 4, 7, 9, 14], formula: "1  3  5  6  9" },
  "Major 7♯5": { intervals: [0, 4, 8, 11], formula: "1  3  ♯5  7" },
  "Major 7♭5": { intervals: [0, 4, 6, 11], formula: "1  3  ♭5  7" },
  "Minor-major 7": { intervals: [0, 3, 7, 11], formula: "1  ♭3  5  7" },
  "7♭9": { intervals: [0, 4, 7, 10, 13], formula: "1  3  5  ♭7  ♭9" },
  "7♯9": { intervals: [0, 4, 7, 10, 15], formula: "1  3  5  ♭7  ♯9" },
  "7♯11": { intervals: [0, 4, 7, 10, 18], formula: "1  3  5  ♭7  ♯11" },
  "7♭13": { intervals: [0, 4, 7, 10, 20], formula: "1  3  5  ♭7  ♭13" },
  "9sus4": { intervals: [0, 5, 7, 10, 14], formula: "1  4  5  ♭7  9" },
  "7alt": { intervals: [0, 4, 10, 13, 15, 18], formula: "1  3  ♭7  ♭9  ♯9  ♯11" },
  "Quartal (three-note)": { intervals: [0, 5, 10], formula: "1  4  ♭7" },
  "Quartal (four-note)": { intervals: [0, 5, 10, 15], formula: "1  4  ♭7  ♯9" },
  "Cluster (seconds)": { intervals: [0, 2, 4], formula: "1  2  3" },
  "Power add octave": { intervals: [0, 7, 12], formula: "1  5  8" }
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
