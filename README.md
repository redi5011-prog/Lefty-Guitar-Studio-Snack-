# Lefty Guitar Studio

A left-handed-first guitar and bass learning and practice app for Android and iOS, built with Expo and React Native.

## Current theory library

- 39 scale and mode entries spanning common major/minor/pentatonic/blues vocabulary, church modes, harmonic and melodic minor families, altered and diminished scales, bebop scales, double harmonic, Hungarian, Neapolitan, Persian, Enigmatic, Prometheus and selected Japanese/world-scale pitch collections.
- 41 chord and sonority entries spanning triads, suspended and power chords, sixth chords, seventh chords, ninths, elevenths, thirteenths, altered dominants, quartal structures and cluster sonorities.
- Root-note transposition across all twelve equal-tempered pitch classes.
- Interval formulas and generated note collections.
- Instrument selector in the scale and chord explorers, with left-handed guitar and four-string bass note maps.
- Interactive guitar and bass fretboards using standard tuning.
- Practice exercise library and elapsed-session timer.

## Current application sections

- **Fretboard:** interactive left-handed guitar fretboard with scale highlighting.
- **Scales:** root and scale selection, interval formula, note collection and instrument-specific fretboard map.
- **Chords:** root and chord selection, chord tones, interval formula and instrument-specific fretboard map.
- **Practice:** exercise library and session timer.
- **Bass:** four-string standard-tuning bass fretboard and scale explorer.

## Development status and accuracy notes

This is an expanding equal-tempered theory reference, not a claim to contain every musical system or every possible voicing. Some world-scale labels refer to equal-tempered approximations of traditions whose original tuning and performance practice may differ. The current note-name generator uses a compact sharp-based pitch spelling; a later notation pass should add context-sensitive enharmonic spelling.

Chord entries describe pitch-class structures, not verified playable guitar/bass voicings. Guitar and bass voicing diagrams, inversions, movable shapes, alternate tunings, five- and six-string bass layouts, arpeggio fingering systems, audible playback, metronome/drum engine, recording, saved progress and offline data still require implementation and device testing.

## Product rules

- Left-handed fretboard orientation is a display convention; it must not reverse musical note order or standard tablature reading order.
- All fingering and chord-voicing diagrams must be checked against a left-handed instrument before production release.
- Do not label a pitch-class collection as a playable voicing unless string/fret constraints and hand reach have been validated.
- Keep the existing Expo project identity, Android package name and working fretboard behaviour intact when extending the app.

## Run locally

Install dependencies and run `npx expo start` in an environment with Node.js, or use the configured Expo Application Services build profiles.
