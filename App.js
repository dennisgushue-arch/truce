import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import ResetScreen from './src/screens/ResetScreen';
import SituationScreen from './src/screens/SituationScreen';
import ScriptScreen from './src/screens/ScriptScreen';
import TextShieldScreen from './src/screens/TextShieldScreen';
import LogScreen from './src/screens/LogScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#16213e' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: '700', letterSpacing: 1 },
          headerBackTitle: 'Back',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reset"
          component={ResetScreen}
          options={{ title: 'RESET', headerShown: false }}
        />
        <Stack.Screen
          name="Situation"
          component={SituationScreen}
          options={{ title: "What's Happening?" }}
        />
        <Stack.Screen
          name="Script"
          component={ScriptScreen}
          options={{ title: 'Your Script' }}
        />
        <Stack.Screen
          name="TextShield"
          component={TextShieldScreen}
          options={{ title: 'Text Shield' }}
        />
        <Stack.Screen
          name="Log"
          component={LogScreen}
          options={{ title: 'Log' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
