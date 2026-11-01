# Lefty Guitar Studio

A left-handed-first guitar and bass learning and practice app for Android and iOS.

## Milestone 0.1

This is the initial Expo / React Native application foundation.

Included:
- Dark mobile interface and primary navigation.
- Left-handed fretboard display convention: headstock left, body right; fret columns descend left-to-right; high E at the top and low E at the bottom.
- A minor pentatonic box 1 test pattern (frets 5–8), including fingering and a manual note-by-note stepper.
- Initial music-theory data module.

Not yet implemented:
- Audio playback, metronome or drum engine.
- Automatic play-along timing.
- Chord and scale transposition engines.
- Recording / multitrack Demo Studio.
- Offline audio assets and persistent practice tracking.

## Run locally or in Expo Snack

This is an Expo project. Install dependencies and run `npx expo start` in an environment with Node.js, or import the project into a compatible Expo development environment.

## Product rule

The fretboard diagram orientation is a display convention. It must not reverse musical note order or standard tablature reading order.

All fingering and diagrams must be checked against a left-handed instrument before production release.
