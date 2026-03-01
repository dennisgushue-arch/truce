import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <View style={styles.header}>
        <Text style={styles.logo}>TRUCE</Text>
        <Text style={styles.tagline}>Stop. Reset. Say This.</Text>
      </View>

      <View style={styles.mainAction}>
        <TouchableOpacity
          style={styles.heatedButton}
          onPress={() => navigation.navigate('Reset')}
          activeOpacity={0.85}
        >
          <Text style={styles.heatedEmoji}>🔥</Text>
          <Text style={styles.heatedLabel}>I'm Heated</Text>
          <Text style={styles.heatedSub}>Tap for a 90-second reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.secondaryActions}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('TextShield')}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryEmoji}>💬</Text>
          <Text style={styles.secondaryLabel}>Rewrite a Text</Text>
          <Text style={styles.secondarySub}>Calm it down before you send it</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Log')}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryEmoji}>📊</Text>
          <Text style={styles.secondaryLabel}>My Log</Text>
          <Text style={styles.secondarySub}>Track your progress</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Regret prevented this week: 0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#8892b0',
    marginTop: 6,
    letterSpacing: 2,
  },
  mainAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heatedButton: {
    backgroundColor: '#e63946',
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 60,
    alignItems: 'center',
    shadowColor: '#e63946',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
    width: '100%',
  },
  heatedEmoji: {
    fontSize: 56,
    marginBottom: 10,
  },
  heatedLabel: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1,
  },
  heatedSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 20,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#16213e',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  secondaryEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  secondaryLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  secondarySub: {
    fontSize: 11,
    color: '#8892b0',
    marginTop: 4,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  footerText: {
    color: '#8892b0',
    fontSize: 13,
  },
});
