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
import { SCRIPTS, SITUATIONS, NEXT_MOVES } from '../data/content';

function modifyScript(script, tone) {
  if (tone === 'firmer') {
    return script + ' I need this to happen.';
  }
  if (tone === 'softer') {
    return script
      .replace('I need', 'I would appreciate it if')
      .replace("I'm not ready", "I'm having trouble being ready");
  }
  if (tone === 'shorter') {
    const first = script.split(/[.!?]/)[0].trim();
    return first.length > 10 ? first + '.' : script;
  }
  return script;
}

export default function ScriptScreen({ navigation, route }) {
  const { situationId } = route.params;
  const situation = SITUATIONS.find(s => s.id === situationId);
  const scripts = SCRIPTS[situationId] || SCRIPTS['misunderstanding'];

  const [selectedScript, setSelectedScript] = useState(0);
  const [tone, setTone] = useState('original');
  const [selectedMove, setSelectedMove] = useState(null);

  const displayScript = modifyScript(scripts[selectedScript], tone);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>{situation?.emoji}</Text>
          <Text style={styles.title}>{situation?.label}</Text>
          <Text style={styles.subtitle}>Your TRUCE script</Text>
        </View>

        {/* Script options */}
        <View style={styles.section}>
          {scripts.map((script, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.scriptCard, selectedScript === i && styles.scriptCardActive]}
              onPress={() => { setSelectedScript(i); setTone('original'); }}
              activeOpacity={0.8}
            >
              <Text style={[styles.scriptText, selectedScript === i && styles.scriptTextActive]}>
                "{script}"
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tone controls */}
        <View style={styles.toneRow}>
          {['firmer', 'softer', 'shorter'].map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.toneButton, tone === t && styles.toneButtonActive]}
              onPress={() => setTone(tone === t ? 'original' : t)}
            >
              <Text style={[styles.toneLabel, tone === t && styles.toneLabelActive]}>
                {t === 'firmer' ? '💪 Firmer' : t === 'softer' ? '🕊 Softer' : '✂️ Shorter'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Active script display */}
        {tone !== 'original' && (
          <View style={styles.modifiedScript}>
            <Text style={styles.modifiedLabel}>Modified:</Text>
            <Text style={styles.modifiedText}>"{displayScript}"</Text>
          </View>
        )}

        {/* One next move */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>One Next Move</Text>
          {NEXT_MOVES.map(move => (
            <TouchableOpacity
              key={move.id}
              style={[styles.moveButton, selectedMove === move.id && styles.moveButtonActive]}
              onPress={() => setSelectedMove(selectedMove === move.id ? null : move.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.moveEmoji}>{move.emoji}</Text>
              <Text style={[styles.moveLabel, selectedMove === move.id && styles.moveLabelActive]}>
                {move.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Done button */}
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate('Log', { outcome: selectedMove, situationId })}
          activeOpacity={0.85}
        >
          <Text style={styles.doneButtonText}>Log this moment →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeLink}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeLinkText}>Back to home</Text>
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
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 20,
  },
  emoji: {
    fontSize: 44,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#8892b0',
    marginTop: 4,
    letterSpacing: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8892b0',
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  scriptCard: {
    backgroundColor: '#16213e',
    borderRadius: 14,
    padding: 18,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#0f3460',
  },
  scriptCardActive: {
    borderColor: '#4cc9f0',
    backgroundColor: '#0d2137',
  },
  scriptText: {
    fontSize: 15,
    color: '#8892b0',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  scriptTextActive: {
    color: '#ccd6f6',
  },
  toneRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  toneButton: {
    flex: 1,
    backgroundColor: '#16213e',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  toneButtonActive: {
    borderColor: '#4cc9f0',
    backgroundColor: '#0d2137',
  },
  toneLabel: {
    fontSize: 13,
    color: '#8892b0',
    fontWeight: '600',
  },
  toneLabelActive: {
    color: '#4cc9f0',
  },
  modifiedScript: {
    backgroundColor: '#0d2137',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4cc9f0',
  },
  modifiedLabel: {
    fontSize: 11,
    color: '#4cc9f0',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  modifiedText: {
    fontSize: 15,
    color: '#ffffff',
    lineHeight: 22,
    fontStyle: 'italic',
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
    borderColor: '#e63946',
    backgroundColor: '#2a0f14',
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
    color: '#ffffff',
  },
  doneButton: {
    backgroundColor: '#e63946',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  doneButtonText: {
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
});
