import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// 1. Import all your screen components
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LiveDataScreen from '../screens/LiveDataScreen';
import SensorDataScreen from '../screens/SensorDataScreen';
import ReportsScreen from '../screens/ReportsScreen';
import AlertsScreen from '../screens/AlertsScreen';
import DevicesScreen from '../screens/DevicesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      {/* AUTH STACK */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      
      {/* MAIN APP STACK */}
      {/* CRITICAL: These names MUST match your Dashboard menuItems */}
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="LiveData" component={LiveDataScreen} />
      <Stack.Screen name="SensorData" component={SensorDataScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Alerts" component={AlertsScreen} />
      <Stack.Screen name="Devices" component={DevicesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}