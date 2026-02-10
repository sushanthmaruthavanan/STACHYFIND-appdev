import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { authService } from '../services/auth.service';

const DashboardScreen = ({ navigation }: any) => {
  
  const handleLogout = async () => {
    const { error } = await authService.signOut();
    if (error) {
      Alert.alert("Logout Error", error.message);
      return;
    }
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>STACHY DASHBOARD</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>SYSTEM ACTIVE</Text>
          </View>
        </View>

        {/* Navigation Grid */}
        <View style={styles.grid}>
          {/* Option 1: Live Data */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('LiveData')}
          >
            <MaterialCommunityIcons name="broadcast" size={32} color="#38BDF8" />
            <Text style={styles.cardTitle}>Live Data</Text>
            <Text style={styles.cardSub}>Real-time stream</Text>
          </TouchableOpacity>

          {/* Option 2: AI Analysis */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('SensorData')}
          >
            <MaterialCommunityIcons name="brain" size={32} color="#38BDF8" />
            <Text style={styles.cardTitle}>Analysis</Text>
            <Text style={styles.cardSub}>Risk prediction</Text>
          </TouchableOpacity>

          {/* Option 3: Reports */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Reports')}
          >
            <MaterialCommunityIcons name="file-chart" size={32} color="#38BDF8" />
            <Text style={styles.cardTitle}>Reports</Text>
            <Text style={styles.cardSub}>Historical logs</Text>
          </TouchableOpacity>

          {/* Option 4: Devices */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => Alert.alert("Coming Soon", "Device management is under maintenance.")}
          >
            <MaterialCommunityIcons name="router-wireless" size={32} color="#38BDF8" />
            <Text style={styles.cardTitle}>Nodes</Text>
            <Text style={styles.cardSub}>Manage hardware</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>TERMINATE SESSION</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050B12' },
  scrollContent: { padding: 24, paddingBottom: 40 },
  header: { marginTop: 40, marginBottom: 30, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '900', color: '#38BDF8', letterSpacing: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 10, backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: 8, borderRadius: 20 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981', marginRight: 8 },
  statusText: { color: '#10B981', fontSize: 10, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { backgroundColor: '#0B1E2D', width: '48%', padding: 20, borderRadius: 20, marginBottom: 15, borderWidth: 1, borderColor: '#1E3A56' },
  cardTitle: { color: '#FFF', fontWeight: '800', marginTop: 10, fontSize: 14 },
  cardSub: { color: '#94A3B8', fontSize: 10, marginTop: 4 },
  logoutBtn: { marginTop: 30, padding: 15, alignItems: 'center' },
  logoutText: { color: '#EF4444', fontWeight: '900', fontSize: 12, letterSpacing: 2 }
});

export default DashboardScreen;