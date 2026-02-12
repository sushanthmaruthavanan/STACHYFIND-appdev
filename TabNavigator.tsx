import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

// Screen Imports
import DashboardScreen from '../screens/DashboardScreen';
import LiveDataScreen from '../screens/LiveDataScreen';
import SensorDataScreen from '../screens/SensorDataScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0B1E2D', borderTopWidth: 0 },
        tabBarActiveTintColor: '#38BDF8',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === 'Dashboard') iconName = 'view-dashboard';
          else if (route.name === 'LiveData') iconName = 'broadcast';
          else if (route.name === 'SensorData') iconName = 'brain';
          else if (route.name === 'Profile') iconName = 'account-circle';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="LiveData" component={LiveDataScreen} />
      <Tab.Screen name="SensorData" component={SensorDataScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;