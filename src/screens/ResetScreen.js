import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const TOTAL_SECONDS = 90;
const BREATH_CYCLE = 8; // 4s inhale + 4s exhale

export default function ResetScreen({ navigation }) {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [phase, setPhase] = useState('inhale'); // 'inhale' | 'exhale'
  const [done, setDone] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const breathAnim = useRef(null);

  // Countdown timer
  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [done]);

  // Breathing animation
  useEffect(() => {
    if (done) {
      if (breathAnim.current) breathAnim.current.stop();
      return;
    }
    const cycle = () => {
      setPhase('inhale');
      breathAnim.current = Animated.parallel([
        Animated.timing(scale, { toValue: 1.6, duration: 4000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.9, duration: 4000, useNativeDriver: true }),
      ]);
      breathAnim.current.start(() => {
        setPhase('exhale');
        breathAnim.current = Animated.parallel([
          Animated.timing(scale, { toValue: 1, duration: 4000, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.4, duration: 4000, useNativeDriver: true }),
        ]);
        breathAnim.current.start(cycle);
      });
    };
    cycle();
    return () => {
      if (breathAnim.current) breathAnim.current.stop();
    };
  }, [done]);

  const progressPercent = ((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100;

  if (done) {
    return (
      <SafeAreaView style={[styles.container, styles.doneContainer]}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        <Text style={styles.doneTitle}>Don't send.{'\n'}Don't speak yet.</Text>
        <Text style={styles.doneSub}>
          Your nervous system just reset.{'\n'}You're ready to choose your next move.
        </Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('Situation')}
          activeOpacity={0.85}
        >
          <Text style={styles.nextButtonText}>Get My Script →</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeLink}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeLinkText}>Back to home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.timerRow}>
        <Text style={styles.timerText}>{secondsLeft}s</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={styles.breathArea}>
        <Animated.View
          style={[
            styles.breathCircle,
            { transform: [{ scale }], opacity },
          ]}
        />
        <Text style={styles.phaseLabel}>
          {phase === 'inhale' ? '↑ Breathe in' : '↓ Breathe out'}
        </Text>
      </View>

      <View style={styles.messageArea}>
        <Text style={styles.messageText}>
          Just breathe.{'\n'}Don't send anything yet.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => { setDone(true); }}
      >
        <Text style={styles.skipText}>Skip →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  timerRow: {
    marginTop: 40,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 56,
    fontWeight: '200',
    color: '#ffffff',
    letterSpacing: 2,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#16213e',
    borderRadius: 2,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: '#4cc9f0',
    borderRadius: 2,
  },
  breathArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#4cc9f0',
    opacity: 0.5,
    shadowColor: '#4cc9f0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 8,
  },
  phaseLabel: {
    marginTop: 32,
    fontSize: 20,
    color: '#8892b0',
    letterSpacing: 2,
  },
  messageArea: {
    paddingBottom: 32,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    color: '#ccd6f6',
    textAlign: 'center',
    lineHeight: 28,
  },
  skipButton: {
    paddingBottom: 24,
  },
  skipText: {
    color: '#8892b0',
    fontSize: 14,
  },
  // Done state
  doneContainer: {
    justifyContent: 'center',
  },
  doneTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 46,
    marginBottom: 20,
  },
  doneSub: {
    fontSize: 16,
    color: '#8892b0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  nextButton: {
    backgroundColor: '#e63946',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  homeLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  homeLinkText: {
    color: '#8892b0',
    fontSize: 14,
  },
});
