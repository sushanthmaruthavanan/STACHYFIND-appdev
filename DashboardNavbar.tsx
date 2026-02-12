// src/components/DashboardNavbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

export function DashboardNavbar({ navigation }: any) {
  return (
    <View style={styles.grid}>
      <DashboardCard
        title="Live Data"
        subtitle="Telemetry feed"
        icon="analytics-outline"
        color={Colors.primary}
        onPress={() => navigation.navigate('LiveData')}
      />
      <DashboardCard
        title="Status"
        subtitle="System health"
        icon="pulse-outline"
        color={Colors.success}
        onPress={() => navigation.navigate('Devices')}
      />
      <DashboardCard
        title="Analysis"
        subtitle="AI Mold logs"
        icon="flask-outline"
        color="#A855F7"
        onPress={() => navigation.navigate('SensorData')}
      />
      <DashboardCard
        title="Reports"
        subtitle="Historical logs"
        icon="document-text-outline"
        color={Colors.warning}
        onPress={() => navigation.navigate('Reports')}
      />
      <DashboardCard
        title="Alerts"
        subtitle="Risk nodes"
        icon="notifications-outline"
        color={Colors.danger}
        onPress={() => navigation.navigate('Alerts')}
      />
      <DashboardCard
        title="Profile"
        subtitle="Settings"
        icon="person-outline"
        color="#FB7185"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

function DashboardCard({ title, subtitle, icon, color, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.iconBox, { backgroundColor: color + '22' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={Colors.subtitle} style={styles.arrow} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 2 },
  card: {
    width: '48%',
    backgroundColor: Colors.cardBackground,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    position: 'relative',
    height: 140, // Uniform height for advanced alignment
    justifyContent: 'space-between'
  },
  iconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  cardTitle: { color: Colors.text, fontWeight: '700', fontSize: 16, letterSpacing: 0.5 },
  cardSubtitle: { color: Colors.subtitle, fontSize: 11, marginTop: 2 },
  arrow: { position: 'absolute', right: 12, top: 16 },
});