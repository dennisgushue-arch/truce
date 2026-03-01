import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { analyzeText } from '../data/content';

export default function TextShieldScreen({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setResult(analyzeText(inputText));
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>💬 Text Shield</Text>
          <Text style={styles.subtitle}>
            Paste the message you want to send.{'\n'}We'll help you say it better.
          </Text>
        </View>

        <TextInput
          style={styles.input}
          multiline
          placeholder="Paste your message here..."
          placeholderTextColor="#4a5568"
          value={inputText}
          onChangeText={setInputText}
          textAlignVertical="top"
          autoCapitalize="sentences"
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.analyzeButton, !inputText.trim() && styles.analyzeButtonDisabled]}
            onPress={handleAnalyze}
            disabled={!inputText.trim()}
            activeOpacity={0.85}
          >
            <Text style={styles.analyzeButtonText}>Analyze →</Text>
          </TouchableOpacity>
          {(inputText.length > 0 || result) && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {result && (
          <View style={styles.results}>
            {/* Risk flags */}
            {result.flagged.length > 0 && (
              <View style={styles.resultCard}>
                <Text style={styles.cardBadge}>⚠️ RISK FLAGS</Text>
                <Text style={styles.cardDescription}>
                  Hot words that may escalate the conversation:
                </Text>
                <View style={styles.flagsRow}>
                  {result.flagged.map((word, i) => (
                    <View key={i} style={styles.flagPill}>
                      <Text style={styles.flagPillText}>"{word}"</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {result.flagged.length === 0 && (
              <View style={[styles.resultCard, styles.safeCard]}>
                <Text style={styles.cardBadge}>✅ LOOKS CALM</Text>
                <Text style={styles.cardDescription}>
                  No high-risk words detected. Your message is already pretty measured.
                </Text>
              </View>
            )}

            {/* Calm rewrite */}
            <View style={styles.resultCard}>
              <Text style={styles.cardBadge}>🕊 CALM REWRITE</Text>
              <Text style={styles.cardDescription}>Same point, less damage:</Text>
              <Text style={styles.rewriteText}>"{result.calmRewrite}"</Text>
            </View>

            {/* Boundary version */}
            <View style={styles.resultCard}>
              <Text style={styles.cardBadge}>🚧 BOUNDARY VERSION</Text>
              <Text style={styles.cardDescription}>Firm without aggression:</Text>
              <Text style={styles.rewriteText}>"{result.boundaryVersion}"</Text>
            </View>

            {/* Short version */}
            <View style={styles.resultCard}>
              <Text style={styles.cardBadge}>✂️ SHORT VERSION</Text>
              <Text style={styles.cardDescription}>One clean sentence:</Text>
              <Text style={styles.rewriteText}>"{result.shortVersion}"</Text>
            </View>
          </View>
        )}

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
    paddingTop: 32,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#8892b0',
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#16213e',
    borderRadius: 14,
    padding: 16,
    fontSize: 15,
    color: '#ffffff',
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#0f3460',
    marginBottom: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  analyzeButton: {
    flex: 1,
    backgroundColor: '#e63946',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  analyzeButtonDisabled: {
    backgroundColor: '#4a1520',
  },
  analyzeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  clearButton: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  clearButtonText: {
    fontSize: 15,
    color: '#8892b0',
    fontWeight: '600',
  },
  results: {
    gap: 14,
    marginBottom: 24,
  },
  resultCard: {
    backgroundColor: '#16213e',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  safeCard: {
    borderColor: '#2ecc71',
  },
  cardBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4cc9f0',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: '#8892b0',
    marginBottom: 10,
  },
  flagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  flagPill: {
    backgroundColor: '#4a1520',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e63946',
  },
  flagPillText: {
    color: '#e63946',
    fontSize: 13,
    fontWeight: '600',
  },
  rewriteText: {
    fontSize: 15,
    color: '#ccd6f6',
    lineHeight: 22,
    fontStyle: 'italic',
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
