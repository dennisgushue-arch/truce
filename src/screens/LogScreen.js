import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SITUATIONS, NEXT_MOVES } from '../data/content';

const INTENSITY_LABELS = ['', '😌', '😐', '😕', '😟', '😤', '😠', '🤬', '🌋', '💥', '☢️'];

export default function LogScreen({ navigation, route }) {
  const preselectedOutcome = route.params?.outcome || null;
  const preselectedSituation = route.params?.situationId || null;

  const [intensity, setIntensity] = useState(5);
  const [outcome, setOutcome] = useState(preselectedOutcome);
  const [saved, setSaved] = useState(false);

  const situation = SITUATIONS.find(s => s.id === preselectedSituation);

  const handleSave = () => {
    // In a real app, persist to storage. Here we just show confirmation.
    setSaved(true);
  };

  if (saved) {
    return (
      <SafeAreaView style={[styles.container, styles.savedContainer]}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        <Text style={styles.savedEmoji}>✅</Text>
        <Text style={styles.savedTitle}>Moment logged.</Text>
        <Text style={styles.savedSub}>
          {`Heat level ${intensity}/10 — regret prevented.`}
        </Text>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.85}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>📊 Log This Moment</Text>
          <Text style={styles.subtitle}>Optional — takes 10 seconds.</Text>
        </View>

        {situation && (
          <View style={styles.situationBadge}>
            <Text style={styles.situationEmoji}>{situation.emoji}</Text>
            <Text style={styles.situationLabel}>{situation.label}</Text>
          </View>
        )}

        {/* Intensity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How heated were you?</Text>
          <View style={styles.intensityDisplay}>
            <Text style={styles.intensityNumber}>{intensity}</Text>
            <Text style={styles.intensityEmoji}>{INTENSITY_LABELS[intensity]}</Text>
            <Text style={styles.intensityScale}>/10</Text>
          </View>
          <View style={styles.intensityRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <TouchableOpacity
                key={n}
                style={[
                  styles.intensityDot,
                  n <= intensity && styles.intensityDotFilled,
                  n === intensity && styles.intensityDotSelected,
                ]}
                onPress={() => setIntensity(n)}
              >
                <Text style={styles.intensityDotText}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Outcome */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What did you do?</Text>
          {NEXT_MOVES.map(move => (
            <TouchableOpacity
              key={move.id}
              style={[styles.moveButton, outcome === move.id && styles.moveButtonActive]}
              onPress={() => setOutcome(outcome === move.id ? null : move.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.moveEmoji}>{move.emoji}</Text>
              <Text style={[styles.moveLabel, outcome === move.id && styles.moveLabelActive]}>
                {move.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveButtonText}>Save →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeLink}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeLinkText}>Skip — back to home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 32,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#8892b0',
  },
  situationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 20,
    alignSelf: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  situationEmoji: {
    fontSize: 20,
  },
  situationLabel: {
    fontSize: 14,
    color: '#ccd6f6',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8892b0',
    marginBottom: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  intensityDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
    gap: 6,
  },
  intensityNumber: {
    fontSize: 52,
    fontWeight: '200',
    color: '#ffffff',
  },
  intensityEmoji: {
    fontSize: 32,
  },
  intensityScale: {
    fontSize: 20,
    color: '#8892b0',
    fontWeight: '300',
  },
  intensityRow: {
    flexDirection: 'row',
    gap: 6,
  },
  intensityDot: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#16213e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  intensityDotFilled: {
    backgroundColor: '#4a1520',
    borderColor: '#e63946',
  },
  intensityDotSelected: {
    backgroundColor: '#e63946',
  },
  intensityDotText: {
    fontSize: 11,
    color: '#8892b0',
    fontWeight: '600',
  },
  moveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#0f3460',
    gap: 12,
  },
  moveButtonActive: {
    borderColor: '#4cc9f0',
    backgroundColor: '#0d2137',
  },
  moveEmoji: {
    fontSize: 20,
  },
  moveLabel: {
    fontSize: 15,
    color: '#8892b0',
    fontWeight: '600',
  },
  moveLabelActive: {
    color: '#4cc9f0',
  },
  saveButton: {
    backgroundColor: '#e63946',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  homeLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  homeLinkText: {
    color: '#8892b0',
    fontSize: 14,
  },
  // Saved state
  savedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  savedEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  savedTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
  },
  savedSub: {
    fontSize: 16,
    color: '#8892b0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  homeButton: {
    backgroundColor: '#e63946',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
