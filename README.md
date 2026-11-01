# Lefty Guitar Studio

A left-handed-first guitar and bass learning and practice app for Android and iOS, built with Expo and React Native.

## Current application features

- Dark mobile interface with dedicated Fretboard, Scales, Chords, Practice and Bass sections.
- Left-handed display convention retained: headstock on the left, body on the right, fret columns descending from left to right, high E at the top and low E at the bottom.
- Interactive guitar and four-string bass fretboards, with notes calculated from standard tuning.
- Root-note selection and transposition across all twelve pitch classes.
- Ten scale types: major, natural minor, major pentatonic, minor pentatonic, blues and the seven diatonic modes.
- Chord construction for major, minor, power, diminished, augmented, suspended, major seventh, minor seventh, dominant seventh and minor seven flat five chords.
- Interval formulas and note spellings for scales and chords.
- Practice exercise library and an elapsed-session timer.

## Development status

The current build establishes the interactive music-theory and practice foundations. Audio playback, audible metronome, backing tracks, recording, verified chord-voicing diagrams, saved progress and offline practice data are not yet implemented. These require dedicated implementation and device testing before they can be described as available features.

## Product rules

- Left-handed fretboard orientation is a display convention; it must not reverse musical note order or standard tablature reading order.
- All fingering and chord-voicing diagrams must be checked against a left-handed instrument before production release.
- Keep existing project identity, Expo configuration, Android package name and working fretboard behaviour intact when extending the app.

## Run locally

Install dependencies and run `npx expo start` in an environment with Node.js, or use the configured Expo Application Services build profiles.
