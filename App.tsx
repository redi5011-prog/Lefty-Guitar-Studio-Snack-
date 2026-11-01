import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Note = { stringName: string; fret: number; note: string; finger: number };
const pattern: Note[] = [
  { stringName: "Low E", fret: 5, note: "A", finger: 1 },
  { stringName: "Low E", fret: 8, note: "C", finger: 4 },
  { stringName: "A", fret: 5, note: "D", finger: 1 },
  { stringName: "A", fret: 7, note: "E", finger: 3 },
  { stringName: "D", fret: 5, note: "G", finger: 1 },
  { stringName: "D", fret: 7, note: "A", finger: 3 },
  { stringName: "G", fret: 5, note: "C", finger: 1 },
  { stringName: "G", fret: 7, note: "D", finger: 3 },
  { stringName: "B", fret: 5, note: "E", finger: 1 },
  { stringName: "B", fret: 8, note: "G", finger: 4 },
  { stringName: "High E", fret: 5, note: "A", finger: 1 },
  { stringName: "High E", fret: 8, note: "C", finger: 4 }
];
const strings = ["High E", "B", "G", "D", "A", "Low E"];
const frets = [8, 7, 6, 5];

export default function App() {
  const [tab, setTab] = useState("Fretboard");
  const [step, setStep] = useState(0);
  const current = pattern[step];
  const sequence = useMemo(() => pattern.map(p => p.note), []);
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.brand}>LEFTY <Text style={styles.brandAccent}>GUITAR STUDIO</Text></Text>
        <Text style={styles.subhead}>GUITAR • BASS • PRACTICE</Text>
      </View>
      <View style={styles.tabs}>
        {["Fretboard", "Chords", "Scales", "Practice"].map(item => (
          <TouchableOpacity key={item} onPress={() => setTab(item)} style={[styles.tab, tab === item && styles.tabActive]}>
            <Text style={[styles.tabText, tab === item && styles.tabTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>{tab.toUpperCase()} EXPLORER</Text>
        <Text style={styles.title}>{tab === "Fretboard" ? "A minor pentatonic" : tab === "Scales" ? "Scale explorer" : tab === "Chords" ? "Chord explorer" : "Practice studio"}</Text>
        <Text style={styles.description}>
          {tab === "Fretboard" ? "Box 1 · Frets 5–8 · Standard tuning" : "This section is being built. The fretboard orientation and core music data are established first."}
        </Text>
        {tab === "Fretboard" ? (
          <>
            <View style={styles.orientation}><Text style={styles.orientationText}>HEADSTOCK  ←</Text><Text style={styles.orientationText}>→  BODY</Text></View>
            <View style={styles.fretboard}>
              <View style={styles.fretHeader}>
                <View style={styles.stringLabel} />
                {frets.map(f => <Text key={f} style={styles.fretNumber}>{f}</Text>)}
              </View>
              {strings.map((s, row) => (
                <View key={s} style={styles.stringRow}>
                  <Text style={styles.stringLabel}>{s}</Text>
                  {frets.map(f => {
                    const note = pattern.find(p => p.stringName === s && p.fret === f);
                    const active = note && current.stringName === s && current.fret === f;
                    return <View key={f} style={styles.fretCell}>
                      {note ? <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel={`${note.note}, ${s} string, fret ${f}, finger ${note.finger}`}
                        onPress={() => setStep(pattern.findIndex(p => p.stringName === s && p.fret === f))}
                        style={[styles.noteDot, active && styles.noteActive]}
                      >
                        <Text style={styles.noteText}>{note.note}</Text>
                        <Text style={styles.fingerText}>{note.finger}</Text>
                      </TouchableOpacity> : null}
                    </View>;
                  })}
                </View>
              ))}
            </View>
            <View style={styles.stepCard}>
              <View>
                <Text style={styles.stepLabel}>CURRENT NOTE · {step + 1} OF {pattern.length}</Text>
                <Text style={styles.stepNote}>{current.note}</Text>
                <Text style={styles.stepDetail}>{current.stringName} string · fret {current.fret} · finger {current.finger}</Text>
              </View>
              <View style={styles.stepButtons}>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep(Math.max(0, step - 1))}><Text style={styles.buttonText}>BACK</Text></TouchableOpacity>
                <TouchableOpacity style={styles.primaryButton} onPress={() => setStep((step + 1) % pattern.length)}><Text style={styles.buttonText}>NEXT NOTE</Text></TouchableOpacity>
              </View>
            </View>
            <Text style={styles.sequenceLabel}>ASCENDING NOTE SEQUENCE</Text>
            <Text style={styles.sequence}>{sequence.join("  ·  ")}</Text>
          </>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderTitle}>Coming in the next build</Text>
            <Text style={styles.description}>The navigation is in place. We'll add each tool with validated note data and left-handed diagrams rather than filling the screen with inaccurate examples.</Text>
          </View>
        )}
        <Text style={styles.footer}>LEFT-HANDED VIEW · HIGH E AT TOP · LOW E AT BOTTOM</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#101318" },
  header: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 16 },
  brand: { color: "#F3F4F6", fontSize: 19, fontWeight: "900", letterSpacing: 1.2 },
  brandAccent: { color: "#E8A642" },
  subhead: { color: "#87909D", fontSize: 10, letterSpacing: 2, marginTop: 5 },
  tabs: { flexDirection: "row", paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: "#2A303A" },
  tab: { flex: 1, paddingVertical: 13, alignItems: "center", borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabActive: { borderBottomColor: "#E8A642" },
  tabText: { color: "#87909D", fontSize: 11, fontWeight: "700" },
  tabTextActive: { color: "#F3F4F6" },
  content: { padding: 20, paddingBottom: 40 },
  eyebrow: { color: "#E8A642", fontSize: 10, fontWeight: "800", letterSpacing: 2 },
  title: { color: "#F3F4F6", fontSize: 26, fontWeight: "800", marginTop: 7 },
  description: { color: "#A5ADB8", fontSize: 13, lineHeight: 20, marginTop: 7 },
  orientation: { flexDirection: "row", justifyContent: "space-between", marginTop: 26, marginBottom: 8 },
  orientationText: { color: "#87909D", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  fretboard: { backgroundColor: "#1A2028", borderRadius: 12, padding: 10, borderWidth: 1, borderColor: "#343D49" },
  fretHeader: { flexDirection: "row", height: 26 },
  stringRow: { flexDirection: "row", height: 49, alignItems: "center" },
  stringLabel: { width: 54, color: "#A5ADB8", fontSize: 10, fontWeight: "700" },
  fretNumber: { flex: 1, color: "#87909D", textAlign: "center", fontSize: 10, fontWeight: "700" },
  fretCell: { flex: 1, height: 49, borderLeftWidth: 1, borderLeftColor: "#596574", alignItems: "center", justifyContent: "center" },
  noteDot: { width: 31, height: 31, borderRadius: 16, backgroundColor: "#34485A", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#60768A" },
  noteActive: { backgroundColor: "#E8A642", borderColor: "#FFD18A", transform: [{ scale: 1.16 }] },
  noteText: { color: "#FFFFFF", fontSize: 11, fontWeight: "900" },
  fingerText: { color: "#D4DCE5", fontSize: 7, marginTop: -1 },
  stepCard: { backgroundColor: "#1B222B", borderRadius: 12, padding: 16, marginTop: 18, borderWidth: 1, borderColor: "#343D49" },
  stepLabel: { color: "#E8A642", fontSize: 9, fontWeight: "800", letterSpacing: 1.3 },
  stepNote: { color: "#FFFFFF", fontSize: 35, fontWeight: "900", marginTop: 3 },
  stepDetail: { color: "#A5ADB8", fontSize: 12, marginTop: 2 },
  stepButtons: { flexDirection: "row", marginTop: 15, gap: 9 },
  primaryButton: { flex: 1, backgroundColor: "#B87925", padding: 13, borderRadius: 8, alignItems: "center" },
  secondaryButton: { padding: 13, borderRadius: 8, borderWidth: 1, borderColor: "#596574", minWidth: 82, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  sequenceLabel: { color: "#87909D", fontSize: 9, fontWeight: "800", letterSpacing: 1.3, marginTop: 22 },
  sequence: { color: "#F3F4F6", fontSize: 12, marginTop: 8, lineHeight: 22 },
  placeholder: { marginTop: 25, padding: 18, borderRadius: 12, backgroundColor: "#1B222B", borderWidth: 1, borderColor: "#343D49" },
  placeholderTitle: { color: "#F3F4F6", fontSize: 16, fontWeight: "800" },
  footer: { color: "#687382", fontSize: 8, letterSpacing: 1, textAlign: "center", marginTop: 28 }
});