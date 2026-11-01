import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View
} from "react-native";
import {
  CHORD_DEFINITIONS, ChordName, getChordNotes, getFretNote, getPitchClasses, getVerifiedOpenGuitarVoicings, getBassTuning, BassStringCount,
  getScaleNotes, NOTE_NAMES, SCALE_DEFINITIONS, ScaleName
} from "./src/musicTheory";

type TabName = "Fretboard" | "Scales" | "Chords" | "Practice" | "Bass" | "Drums";
type Exercise = { title: string; detail: string; duration: string };

const TABS: TabName[] = ["Fretboard", "Scales", "Chords", "Practice", "Bass", "Drums"];
const SCALE_NAMES = Object.keys(SCALE_DEFINITIONS) as ScaleName[];
const CHORD_NAMES = Object.keys(CHORD_DEFINITIONS) as ChordName[];
const ROOTS = [...NOTE_NAMES];
const EXERCISES: Exercise[] = [
  { title: "Chromatic warm-up", detail: "Play four notes per string, slowly and evenly. Keep the fretting hand relaxed.", duration: "5 min" },
  { title: "Pentatonic accuracy", detail: "Play the selected minor pentatonic scale ascending and descending. Aim for clean note changes.", duration: "8 min" },
  { title: "String crossing", detail: "Move between adjacent strings without catching neighbouring strings. Use a controlled picking motion.", duration: "5 min" },
  { title: "Chord changes", detail: "Alternate between two chord shapes. Lift only as much as needed and keep the rhythm steady.", duration: "8 min" },
  { title: "Free practice", detail: "Choose a scale or chord and work through it at your own pace.", duration: "Open" }
];

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return minutes + ":" + remainder;
}

export default function App() {
  const [tab, setTab] = useState<TabName>("Fretboard");
  const [root, setRoot] = useState("A");
  const [scale, setScale] = useState<ScaleName>("Minor pentatonic");
  const [chord, setChord] = useState<ChordName>("Minor");
  const [theoryInstrument, setTheoryInstrument] = useState<"Guitar" | "Bass">("Guitar");
  const [bassStringCount, setBassStringCount] = useState<BassStringCount>(4);
  const [selectedNote, setSelectedNote] = useState<{ note: string; stringName: string; fret: number } | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [sessionRunning, setSessionRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [drumBpm, setDrumBpm] = useState(100);
  const [drumPattern, setDrumPattern] = useState("Straight rock");
  const [drumSteps, setDrumSteps] = useState<Record<string, number[]>>({ Kick: [0, 8], Snare: [4, 12], "Closed hi-hat": [0, 2, 4, 6, 8, 10, 12, 14], "Open hi-hat": [] });
  const [drumRunning, setDrumRunning] = useState(false);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (!sessionRunning) return;
    const timer = setInterval(() => setElapsed(value => value + 1), 1000);
    return () => clearInterval(timer);
  }, [sessionRunning]);

  const scaleNotes = useMemo(() => getScaleNotes(root, scale), [root, scale]);
  const chordNotes = useMemo(() => getChordNotes(root, chord), [root, chord]);
  const activeNotes = tab === "Chords" ? chordNotes : scaleNotes;
  const activePitchClasses = useMemo(() => getPitchClasses(activeNotes), [activeNotes]);
  const isBass = tab === "Bass";
  const fretColumns = Array.from({ length: 13 }, (_, index) => 12 - index);
  const currentExercise = EXERCISES[exerciseIndex];

  const renderInstrumentPicker = () => (
    <View style={styles.instrumentRow}>
      {(["Guitar", "Bass"] as const).map(item => (
        <TouchableOpacity key={item} onPress={() => { setTheoryInstrument(item); setSelectedNote(null); }} style={[styles.instrumentButton, theoryInstrument === item && styles.instrumentButtonActive]}>
          <Text style={[styles.instrumentText, theoryInstrument === item && styles.instrumentTextActive]}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRootPicker = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pickerRow}>
      {ROOTS.map(note => (
        <TouchableOpacity key={note} onPress={() => { setRoot(note); setSelectedNote(null); }} style={[styles.pickerChip, root === note && styles.pickerChipActive]}>
          <Text style={[styles.pickerText, root === note && styles.pickerTextActive]}>{note}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderScalePicker = () => (
    <View style={styles.choiceGrid}>
      {SCALE_NAMES.map(name => (
        <TouchableOpacity key={name} onPress={() => setScale(name)} style={[styles.choiceChip, scale === name && styles.choiceChipActive]}>
          <Text style={[styles.choiceText, scale === name && styles.choiceTextActive]}>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderFretboard = (noteNames: string[], bass: boolean) => {
    const pitchClasses = getPitchClasses(noteNames);
    const bassTuning = getBassTuning(bassStringCount);
    const rows = bass
      ? bassTuning.slice().reverse().map((open, index) => ({
          name: index === 0 ? "High " + open : index === bassTuning.length - 1 ? "Low " + open : open,
          open
        }))
      : [{ name: "High E", open: "E" }, { name: "B", open: "B" }, { name: "G", open: "G" }, { name: "D", open: "D" }, { name: "A", open: "A" }, { name: "Low E", open: "E" }];
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={styles.boardScroll}>
        <View style={styles.fretboard}>
          <View style={styles.fretHeader}>
            <Text style={styles.stringLabel}>STRING</Text>
            {fretColumns.map(fret => <Text key={fret} style={styles.fretNumber}>{fret === 0 ? "OPEN" : fret}</Text>)}
          </View>
          {rows.map(row => (
            <View key={row.name} style={styles.stringRow}>
              <Text style={styles.stringLabel}>{row.name}</Text>
              {fretColumns.map(fret => {
                const note = getFretNote(row.open, fret);
                const pitch = getPitchClasses([note])[0];
                const included = pitchClasses.includes(pitch);
                const isRoot = pitch === getPitchClasses([root])[0];
                const selected = selectedNote?.stringName === row.name && selectedNote?.fret === fret;
                return (
                  <View key={fret} style={styles.fretCell}>
                    {included ? (
                      <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel={note + ", " + row.name + " string, fret " + fret}
                        onPress={() => setSelectedNote({ note, stringName: row.name, fret })}
                        style={[styles.noteDot, isRoot && styles.rootDot, selected && styles.selectedDot]}
                      >
                        <Text style={[styles.noteText, isRoot && styles.rootNoteText]}>{note}</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderFretboardScreen = (bass: boolean) => (
    <>
      <Text style={styles.eyebrow}>{bass ? "BASS TOOLKIT" : "GUITAR TOOLKIT"}</Text>
      <Text style={styles.title}>{bass ? "Bass fretboard" : "Fretboard explorer"}</Text>
      <Text style={styles.description}>Choose a root and scale. Notes are calculated across the instrument in standard tuning.</Text>
      {bass ? <><Text style={styles.sectionLabel}>BASS STRING COUNT</Text><View style={styles.instrumentRow}>{([4, 5, 6] as BassStringCount[]).map(count => <TouchableOpacity key={count} onPress={() => { setBassStringCount(count); setSelectedNote(null); }} style={[styles.instrumentButton, bassStringCount === count && styles.instrumentButtonActive]}><Text style={[styles.instrumentText, bassStringCount === count && styles.instrumentTextActive]}>{count} STRING</Text></TouchableOpacity>)}</View></> : null}
      <Text style={styles.sectionLabel}>ROOT NOTE</Text>
      {renderRootPicker()}
      <Text style={styles.sectionLabel}>SCALE</Text>
      {renderScalePicker()}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>SELECTED SCALE</Text>
        <Text style={styles.summaryTitle}>{root} {scale}</Text>
        <Text style={styles.summaryNotes}>{scaleNotes.join("  ·  ")}</Text>
      </View>
      <View style={styles.orientation}><Text style={styles.orientationText}>HEADSTOCK  ←</Text><Text style={styles.orientationText}>→  BODY</Text></View>
      {renderFretboard(scaleNotes, bass)}
      <View style={styles.legendRow}>
        <View style={[styles.legendDot, styles.rootDot]} /><Text style={styles.legendText}>Root note</Text>
        <View style={styles.legendDot} /><Text style={styles.legendText}>Scale note</Text>
      </View>
      {selectedNote ? (
        <View style={styles.selectedCard}>
          <Text style={styles.summaryLabel}>SELECTED NOTE</Text>
          <Text style={styles.selectedNote}>{selectedNote.note}</Text>
          <Text style={styles.description}>{selectedNote.stringName} string · fret {selectedNote.fret}</Text>
        </View>
      ) : (
        <Text style={styles.hint}>Tap any highlighted note to inspect its position.</Text>
      )}
      <Text style={styles.footer}>LEFT-HANDED DISPLAY · HIGH E AT TOP · LOW E AT BOTTOM</Text>
    </>
  );

  const renderScalesScreen = () => (
    <>
      <Text style={styles.eyebrow}>SCALE LIBRARY</Text>
      <Text style={styles.title}>Scale explorer</Text>
      <Text style={styles.description}>Explore the intervals and notes that make up each scale. Change the root to transpose the scale.</Text>
      <Text style={styles.sectionLabel}>INSTRUMENT</Text>
      {renderInstrumentPicker()}
      <Text style={styles.sectionLabel}>ROOT NOTE</Text>
      {renderRootPicker()}
      <Text style={styles.sectionLabel}>SELECT A SCALE</Text>
      {renderScalePicker()}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>SCALE NOTES</Text>
        <Text style={styles.summaryTitle}>{root} {scale}</Text>
        <Text style={styles.summaryNotes}>{scaleNotes.join("   ·   ")}</Text>
        <View style={styles.rule} />
        <Text style={styles.summaryLabel}>INTERVAL FORMULA</Text>
        <Text style={styles.formula}>{SCALE_DEFINITIONS[scale].formula}</Text>
      </View>
      <Text style={styles.sectionLabel}>{theoryInstrument.toUpperCase()} SCALE MAP · LEFT-HANDED</Text>
      {renderFretboard(scaleNotes, theoryInstrument === "Bass")}
      <Text style={styles.sectionLabel}>PRACTICAL USE</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>How to practise it</Text>
        <Text style={styles.description}>Play the notes slowly in sequence, then reverse the order. Once the fingering is comfortable, create short phrases using only these notes. Keep the root note as your point of resolution.</Text>
      </View>
      <Text style={styles.sectionLabel}>ALL AVAILABLE SCALES</Text>
      {SCALE_NAMES.map(name => (
        <TouchableOpacity key={name} onPress={() => setScale(name)} style={styles.listRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.listTitle}>{name}</Text>
            <Text style={styles.listDetail}>{getScaleNotes(root, name).join(" · ")}</Text>
          </View>
          <Text style={styles.listArrow}>{scale === name ? "✓" : "›"}</Text>
        </TouchableOpacity>
      ))}
    </>
  );

  const renderChordsScreen = () => (
    <>
      <Text style={styles.eyebrow}>CHORD LIBRARY</Text>
      <Text style={styles.title}>Chord explorer</Text>
      <Text style={styles.description}>Build chords from intervals and see the notes that form each chord. Change the root to transpose it.</Text>
      <Text style={styles.sectionLabel}>INSTRUMENT</Text>
      {renderInstrumentPicker()}
      <Text style={styles.sectionLabel}>ROOT NOTE</Text>
      {renderRootPicker()}
      <Text style={styles.sectionLabel}>CHORD TYPE</Text>
      <View style={styles.choiceGrid}>
        {CHORD_NAMES.map(name => (
          <TouchableOpacity key={name} onPress={() => setChord(name)} style={[styles.choiceChip, chord === name && styles.choiceChipActive]}>
            <Text style={[styles.choiceText, chord === name && styles.choiceTextActive]}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>CHORD NOTES</Text>
        <Text style={styles.summaryTitle}>{root} {chord}</Text>
        <View style={styles.chordNotesRow}>
          {chordNotes.map((note, index) => (
            <View key={note + index} style={[styles.chordNote, index === 0 && styles.chordRoot]}>
              <Text style={styles.chordNoteText}>{note}</Text>
            </View>
          ))}
        </View>
        <View style={styles.rule} />
        <Text style={styles.summaryLabel}>INTERVAL FORMULA</Text>
        <Text style={styles.formula}>{CHORD_DEFINITIONS[chord].formula}</Text>
      </View>
      <Text style={styles.sectionLabel}>{theoryInstrument.toUpperCase()} CHORD TONE MAP · LEFT-HANDED</Text>
      {renderFretboard(chordNotes, theoryInstrument === "Bass")}
      <Text style={styles.sectionLabel}>CHORD CONSTRUCTION</Text>
      {chordNotes.map((note, index) => (
        <View key={note + index} style={styles.listRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.listTitle}>{index === 0 ? "Root" : "Chord tone " + (index + 1)}</Text>
            <Text style={styles.listDetail}>Note {note}</Text>
          </View>
          <Text style={styles.chordTone}>{CHORD_DEFINITIONS[chord].formula.split("  ")[index]}</Text>
        </View>
      ))}
      <Text style={styles.sectionLabel}>VERIFIED OPEN GUITAR SHAPE</Text>
      {theoryInstrument === "Guitar" && getVerifiedOpenGuitarVoicings(root, chord).length ? getVerifiedOpenGuitarVoicings(root, chord).map(voicing => <View key={voicing.name} style={styles.infoCard}><Text style={styles.infoTitle}>{voicing.name} · {voicing.inversion}</Text><Text style={styles.listDetail}>String order, low to high: {voicing.positions.map(position => position.fret === null ? "X" : position.fret === 0 ? "0" : String(position.fret)).join("  ")}</Text><Text style={styles.listDetail}>Notes: {voicing.positions.filter(position => position.note).map(position => position.note).join(" · ")}</Text><Text style={styles.listDetail}>Bass note: {voicing.bassNote} · verified against the selected chord tones</Text></View>) : <Text style={styles.hint}>No curated verified open-position shape is currently available for this root and chord. The fretboard above remains a chord-tone map, not a fingering diagram.</Text>}
      <Text style={styles.hint}>Only curated open-position major and minor shapes are shown here. Movable shapes, inversions and bass-specific chord grips are still to be added; unsupported shapes are deliberately not invented.</Text>
    </>
  );

  const DRUM_PATTERNS: Record<string, Record<string, number[]>> = {
    "Straight rock": { Kick: [0, 8], Snare: [4, 12], "Closed hi-hat": [0, 2, 4, 6, 8, 10, 12, 14], "Open hi-hat": [] },
    "Half-time": { Kick: [0, 10], Snare: [8], "Closed hi-hat": [0, 2, 4, 6, 8, 10, 12, 14], "Open hi-hat": [] },
    "Blues shuffle": { Kick: [0, 6, 8, 14], Snare: [4, 12], "Closed hi-hat": [0, 3, 4, 7, 8, 11, 12, 15], "Open hi-hat": [] },
    "Four on the floor": { Kick: [0, 4, 8, 12], Snare: [4, 12], "Closed hi-hat": [0, 2, 4, 6, 8, 10, 12, 14], "Open hi-hat": [6, 14] }
  };
  const applyDrumPattern = (name: string) => { setDrumPattern(name); setDrumSteps(DRUM_PATTERNS[name]); };
  const toggleDrumStep = (instrument: string, step: number) => setDrumSteps(current => ({ ...current, [instrument]: current[instrument].includes(step) ? current[instrument].filter(value => value !== step) : [...current[instrument], step].sort((a, b) => a - b) }));
  const renderDrumScreen = () => (
    <>
      <Text style={styles.eyebrow}>RHYTHM & DEMO ROOM</Text>
      <Text style={styles.title}>Drum machine</Text>
      <Text style={styles.description}>Choose a backing groove or build a beat on the 16-step grid. Recording will live here alongside the drum controls.</Text>
      <View style={styles.timerCard}>
        <Text style={styles.summaryLabel}>TEMPO</Text>
        <View style={styles.tempoRow}>
          <TouchableOpacity style={styles.tempoButton} onPress={() => setDrumBpm(value => Math.max(40, value - 1))}><Text style={styles.tempoButtonText}>−</Text></TouchableOpacity>
          <Text style={styles.tempoValue}>{drumBpm} <Text style={styles.tempoUnit}>BPM</Text></Text>
          <TouchableOpacity style={styles.tempoButton} onPress={() => setDrumBpm(value => Math.min(240, value + 1))}><Text style={styles.tempoButtonText}>+</Text></TouchableOpacity>
        </View>
        <View style={styles.stepButtons}>
          <TouchableOpacity onPress={() => setDrumRunning(value => !value)} style={styles.primaryButton}><Text style={styles.buttonText}>{drumRunning ? "STOP" : "PLAY LOOP"}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setRecording(value => !value)} style={[styles.recordButton, recording && styles.recordButtonActive]}><Text style={styles.buttonText}>{recording ? "STOP RECORDING" : "● RECORD"}</Text></TouchableOpacity>
        </View>
        <Text style={styles.hint}>Playback and microphone recording are not connected yet. The controls below define the beat while the audio engine is added.</Text>
      </View>
      <Text style={styles.sectionLabel}>PRESET GROOVES</Text>
      <View style={styles.choiceGrid}>
        {Object.keys(DRUM_PATTERNS).map(name => <TouchableOpacity key={name} onPress={() => applyDrumPattern(name)} style={[styles.choiceChip, drumPattern === name && styles.choiceChipActive]}><Text style={[styles.choiceText, drumPattern === name && styles.choiceTextActive]}>{name}</Text></TouchableOpacity>)}
      </View>
      <Text style={styles.sectionLabel}>16-STEP BEAT PROGRAMMER</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>{drumPattern} · 1 BAR</Text>
        {Object.keys(drumSteps).map(instrument => (
          <View key={instrument} style={styles.drumRow}>
            <Text style={styles.drumInstrument}>{instrument}</Text>
            <View style={styles.drumSteps}>
              {Array.from({ length: 16 }, (_, step) => <TouchableOpacity key={step} accessibilityRole="button" accessibilityLabel={instrument + " step " + (step + 1)} onPress={() => toggleDrumStep(instrument, step)} style={[styles.drumStep, drumSteps[instrument].includes(step) && styles.drumStepActive, step % 4 === 0 && styles.drumBeatStart]} />)}
            </View>
          </View>
        ))}
        <Text style={styles.hint}>Tap a square to switch that drum hit on or off. Steps 1, 5, 9 and 13 mark the quarter-note beats.</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => { setDrumSteps({ Kick: [], Snare: [], "Closed hi-hat": [], "Open hi-hat": [] }); setDrumPattern("Custom"); }}><Text style={styles.buttonText}>CLEAR PATTERN</Text></TouchableOpacity>
      </View>
      <Text style={styles.sectionLabel}>DEMO RECORDING</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Record with your groove</Text>
        <Text style={styles.description}>The finished recording area will capture your instrument performance and the drum backing together, then let you replay and save the combined demo. It will not be a separate recording screen.</Text>
        <Text style={styles.hint}>Next audio milestone: integrate drum playback, input recording, synchronisation and demo playback in this screen.</Text>
      </View>
    </>
  );

  const renderPracticeScreen = () => (
    <>
      <Text style={styles.eyebrow}>PRACTICE ROOM</Text>
      <Text style={styles.title}>Practice studio</Text>
      <Text style={styles.description}>Choose a focused exercise and track the time you spend practising. Your session timer runs while the app is open.</Text>
      <View style={styles.timerCard}>
        <Text style={styles.summaryLabel}>SESSION TIMER</Text>
        <Text style={styles.timer}>{formatTime(elapsed)}</Text>
        <Text style={styles.description}>{sessionRunning ? "Session in progress" : "Ready when you are"}</Text>
        <View style={styles.stepButtons}>
          <TouchableOpacity onPress={() => setSessionRunning(value => !value)} style={styles.primaryButton}>
            <Text style={styles.buttonText}>{sessionRunning ? "PAUSE SESSION" : "START SESSION"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSessionRunning(false); setElapsed(0); }} style={styles.secondaryButton}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.sectionLabel}>EXERCISE PLAN</Text>
      {EXERCISES.map((exercise, index) => (
        <TouchableOpacity key={exercise.title} onPress={() => setExerciseIndex(index)} style={[styles.exerciseCard, exerciseIndex === index && styles.exerciseActive]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.listTitle}>{exercise.title}</Text>
            <Text style={styles.listDetail}>{exercise.detail}</Text>
          </View>
          <Text style={styles.duration}>{exercise.duration}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Current exercise</Text>
        <Text style={styles.listTitle}>{currentExercise.title}</Text>
        <Text style={styles.description}>{currentExercise.detail}</Text>
        <Text style={styles.duration}>Suggested duration: {currentExercise.duration}</Text>
      </View>
      <Text style={styles.hint}>This first practice module tracks elapsed time locally. An audible metronome, backing tracks and recording tools will be added as dedicated audio features.</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.brand}>LEFTY <Text style={styles.brandAccent}>GUITAR STUDIO</Text></Text>
        <Text style={styles.subhead}>GUITAR  ·  BASS  ·  PRACTICE</Text>
      </View>
      <View style={styles.tabs}>
        {TABS.map(item => (
          <TouchableOpacity key={item} onPress={() => { setTab(item); setSelectedNote(null); }} style={[styles.tab, tab === item && styles.tabActive]}>
            <Text style={[styles.tabText, tab === item && styles.tabTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.content}>
        {tab === "Fretboard" ? renderFretboardScreen(false) : null}
        {tab === "Bass" ? renderFretboardScreen(true) : null}
        {tab === "Scales" ? renderScalesScreen() : null}
        {tab === "Chords" ? renderChordsScreen() : null}
        {tab === "Practice" ? renderPracticeScreen() : null}
        {tab === "Drums" ? renderDrumScreen() : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#101318", paddingTop: StatusBar.currentHeight || 0 },
  header: { paddingHorizontal: 20, paddingTop: 9, paddingBottom: 13 },
  brand: { color: "#F3F4F6", fontSize: 19, fontWeight: "900", letterSpacing: 1.2 },
  brandAccent: { color: "#E8A642" },
  subhead: { color: "#87909D", fontSize: 10, letterSpacing: 2, marginTop: 5 },
  tabs: { flexDirection: "row", flexWrap: "wrap", borderBottomWidth: 1, borderBottomColor: "#2A303A" },
  tabsContent: { paddingHorizontal: 10 },
  tab: { width: "33.333%", paddingHorizontal: 4, paddingVertical: 12, alignItems: "center", borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabActive: { borderBottomColor: "#E8A642" },
  tabText: { color: "#87909D", fontSize: 11, fontWeight: "700" },
  tabTextActive: { color: "#F3F4F6" },
  content: { padding: 18, paddingBottom: 44 },
  eyebrow: { color: "#E8A642", fontSize: 10, fontWeight: "800", letterSpacing: 2 },
  title: { color: "#F3F4F6", fontSize: 26, fontWeight: "800", marginTop: 7 },
  description: { color: "#A5ADB8", fontSize: 13, lineHeight: 20, marginTop: 7 },
  sectionLabel: { color: "#87909D", fontSize: 10, fontWeight: "800", letterSpacing: 1.4, marginTop: 23, marginBottom: 9 },
  pickerRow: { gap: 7, paddingVertical: 2 },
  instrumentRow: { flexDirection: "row", gap: 9 },
  instrumentButton: { flex: 1, paddingVertical: 11, borderRadius: 8, alignItems: "center", backgroundColor: "#202731", borderWidth: 1, borderColor: "#343D49" },
  instrumentButtonActive: { backgroundColor: "#3A2B19", borderColor: "#E8A642" },
  instrumentText: { color: "#A5ADB8", fontSize: 12, fontWeight: "800" },
  instrumentTextActive: { color: "#F4C77F" },
  pickerChip: { minWidth: 38, paddingHorizontal: 10, paddingVertical: 9, alignItems: "center", borderRadius: 8, backgroundColor: "#202731", borderWidth: 1, borderColor: "#343D49" },
  pickerChipActive: { backgroundColor: "#B87925", borderColor: "#E8A642" },
  pickerText: { color: "#C2CAD4", fontSize: 12, fontWeight: "700" },
  pickerTextActive: { color: "#FFFFFF" },
  choiceGrid: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  choiceChip: { paddingHorizontal: 11, paddingVertical: 9, borderRadius: 8, backgroundColor: "#202731", borderWidth: 1, borderColor: "#343D49" },
  choiceChipActive: { backgroundColor: "#3A2B19", borderColor: "#E8A642" },
  choiceText: { color: "#A5ADB8", fontSize: 11, fontWeight: "700" },
  choiceTextActive: { color: "#F4C77F" },
  summaryCard: { backgroundColor: "#1B222B", borderRadius: 12, padding: 16, marginTop: 18, borderWidth: 1, borderColor: "#343D49" },
  summaryLabel: { color: "#E8A642", fontSize: 9, fontWeight: "800", letterSpacing: 1.3 },
  summaryTitle: { color: "#F3F4F6", fontSize: 21, fontWeight: "800", marginTop: 5 },
  summaryNotes: { color: "#D6DCE4", fontSize: 14, lineHeight: 24, marginTop: 9 },
  formula: { color: "#FFFFFF", fontSize: 17, fontWeight: "700", marginTop: 8, letterSpacing: 1 },
  rule: { height: 1, backgroundColor: "#343D49", marginVertical: 15 },
  orientation: { flexDirection: "row", justifyContent: "space-between", marginTop: 24, marginBottom: 8 },
  orientationText: { color: "#87909D", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  boardScroll: { paddingBottom: 3 },
  fretboard: { backgroundColor: "#1A2028", borderRadius: 12, padding: 9, borderWidth: 1, borderColor: "#343D49" },
  fretHeader: { flexDirection: "row", height: 27, alignItems: "center" },
  stringRow: { flexDirection: "row", height: 46, alignItems: "center" },
  stringLabel: { width: 48, color: "#A5ADB8", fontSize: 9, fontWeight: "700" },
  fretNumber: { width: 38, color: "#87909D", textAlign: "center", fontSize: 9, fontWeight: "700" },
  fretCell: { width: 38, height: 46, borderLeftWidth: 1, borderLeftColor: "#596574", alignItems: "center", justifyContent: "center" },
  noteDot: { width: 28, height: 28, borderRadius: 15, backgroundColor: "#34485A", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#60768A" },
  rootDot: { backgroundColor: "#B87925", borderColor: "#E8A642" },
  selectedDot: { borderWidth: 2, borderColor: "#FFFFFF", transform: [{ scale: 1.12 }] },
  noteText: { color: "#FFFFFF", fontSize: 9, fontWeight: "900" },
  rootNoteText: { color: "#FFFFFF" },
  legendRow: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 12 },
  legendDot: { width: 10, height: 10, borderRadius: 6, backgroundColor: "#34485A", borderWidth: 1, borderColor: "#60768A", marginLeft: 9 },
  legendText: { color: "#A5ADB8", fontSize: 10 },
  selectedCard: { backgroundColor: "#1B222B", borderRadius: 10, padding: 14, marginTop: 16, borderWidth: 1, borderColor: "#343D49" },
  selectedNote: { color: "#FFFFFF", fontSize: 32, fontWeight: "900", marginTop: 4 },
  hint: { color: "#87909D", fontSize: 11, lineHeight: 17, marginTop: 16 },
  footer: { color: "#687382", fontSize: 8, letterSpacing: 1, textAlign: "center", marginTop: 25 },
  infoCard: { backgroundColor: "#1B222B", borderRadius: 11, padding: 15, marginTop: 13, borderWidth: 1, borderColor: "#343D49" },
  infoTitle: { color: "#E8A642", fontSize: 12, fontWeight: "800", marginBottom: 6 },
  listRow: { flexDirection: "row", alignItems: "center", paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: "#2A303A" },
  listTitle: { color: "#F3F4F6", fontSize: 13, fontWeight: "700" },
  listDetail: { color: "#87909D", fontSize: 11, lineHeight: 17, marginTop: 4 },
  listArrow: { color: "#E8A642", fontSize: 20, paddingHorizontal: 8 },
  chordNotesRow: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 13 },
  chordNote: { width: 43, height: 43, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: "#34485A", borderWidth: 1, borderColor: "#60768A" },
  chordRoot: { backgroundColor: "#B87925", borderColor: "#E8A642" },
  chordNoteText: { color: "#FFFFFF", fontSize: 13, fontWeight: "900" },
  chordTone: { color: "#E8A642", fontSize: 14, fontWeight: "800", paddingHorizontal: 12 },
  timerCard: { backgroundColor: "#1B222B", borderRadius: 12, padding: 17, marginTop: 18, borderWidth: 1, borderColor: "#343D49" },
  timer: { color: "#FFFFFF", fontSize: 44, fontWeight: "900", fontVariant: ["tabular-nums"], marginTop: 7 },
  stepButtons: { flexDirection: "row", alignItems: "center", gap: 9, marginTop: 15 },
  primaryButton: { flex: 1, backgroundColor: "#B87925", padding: 13, borderRadius: 8, alignItems: "center" },
  secondaryButton: { padding: 13, borderRadius: 8, borderWidth: 1, borderColor: "#596574", minWidth: 82, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  exerciseCard: { flexDirection: "row", alignItems: "center", gap: 10, padding: 13, marginBottom: 8, backgroundColor: "#1B222B", borderRadius: 10, borderWidth: 1, borderColor: "#343D49" },
  exerciseActive: { borderColor: "#E8A642", backgroundColor: "#292319" },
  duration: { color: "#E8A642", fontSize: 10, fontWeight: "800", marginTop: 7 },\n  tempoRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 },\n  tempoButton: { width: 48, height: 44, borderRadius: 8, backgroundColor: "#303A46", alignItems: "center", justifyContent: "center" },\n  tempoButtonText: { color: "#FFFFFF", fontSize: 25, fontWeight: "700" },\n  tempoValue: { color: "#FFFFFF", fontSize: 32, fontWeight: "900" },\n  tempoUnit: { color: "#A5ADB8", fontSize: 13 },\n  recordButton: { flex: 1, backgroundColor: "#6F3035", padding: 13, borderRadius: 8, alignItems: "center" },\n  recordButtonActive: { backgroundColor: "#B32632" },\n  drumRow: { marginTop: 15 },\n  drumInstrument: { color: "#D6DCE4", fontSize: 11, fontWeight: "800", marginBottom: 7 },\n  drumSteps: { flexDirection: "row", justifyContent: "space-between", gap: 3 },\n  drumStep: { flex: 1, height: 27, borderRadius: 4, backgroundColor: "#303A46", borderWidth: 1, borderColor: "#465363" },\n  drumStepActive: { backgroundColor: "#B87925", borderColor: "#E8A642" },\n  drumBeatStart: { borderLeftWidth: 2, borderLeftColor: "#A5ADB8" }
});
