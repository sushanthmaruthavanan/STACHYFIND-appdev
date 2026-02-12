import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { authService } from '../services/auth.service';

const DashboardScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * INTEGRATED: Fetches profile and recovers session
     */
    const initializeDashboard = async () => {
      try {
        const { user } = await authService.getCurrentUser();
        
        if (user?.user_metadata?.full_name) {
          // Extracts the first name for a cleaner greeting
          setUserName(user.user_metadata.full_name.split(' ')[0]);
        }
      } catch (error) {
        console.error("Dashboard Init Error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  const menuItems = [
    { name: 'LiveData', label: 'LIVE FEED', icon: 'broadcast', color: '#10B981' },
    { name: 'SensorData', label: 'ANALYSIS', icon: 'brain', color: '#38BDF8' },
    { name: 'Reports', label: 'REPORTS', icon: 'file-chart', color: '#818CF8' },
    { name: 'Alerts', label: 'ALERTS', icon: 'bell-ring', color: '#F87171' },
    { name: 'Devices', label: 'DEVICES', icon: 'router-wireless', color: '#A78BFA' },
    { name: 'Profile', label: 'PROFILE', icon: 'account-circle', color: '#F472B6' },
  ];

  if (loading) {
    return (
      <View style={[GlobalStyles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={GlobalStyles.container} contentContainerStyle={styles.scrollContent}>
      {/* Welcome Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Alerts')}>
          <MaterialCommunityIcons name="bell-outline" size={26} color="#FFF" />
          <View style={styles.notifBadge} />
        </TouchableOpacity>
      </View>

      {/* Main Status Card */}
      <View style={styles.statusCard}>
        <View>
          <Text style={styles.statusLabel}>ENVIRONMENT STATUS</Text>
          <Text style={styles.statusValue}>HEALTHY</Text>
        </View>
        <MaterialCommunityIcons name="shield-check" size={40} color="#10B981" />
      </View>

      {/* Navigation Grid */}
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.name} 
            style={styles.card} 
            onPress={() => navigation.navigate(item.name)}
          >
            <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
              <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
            </View>
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Action */}
      <TouchableOpacity 
        style={styles.scanAction}
        onPress={() => navigation.navigate('Devices')}
      >
        <Text style={styles.scanText}>Sync New Stachy Node</Text>
        <MaterialCommunityIcons name="plus-circle-outline" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: { justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 30 },
  welcomeText: { color: Colors.subtitle, fontSize: 14, fontWeight: '600' },
  nameText: { color: '#FFF', fontSize: 28, fontWeight: '900', letterSpacing: 1 },
  notifBtn: { backgroundColor: '#0B1E2D', padding: 10, borderRadius: 12, position: 'relative' },
  notifBadge: { position: 'absolute', top: 10, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#F87171', borderWidth: 2, borderColor: '#0B1E2D' },
  statusCard: { backgroundColor: '#0B1E2D', padding: 25, borderRadius: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, borderWidth: 1, borderColor: '#1E3A56' },
  statusLabel: { color: Colors.subtitle, fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  statusValue: { color: '#FFF', fontSize: 24, fontWeight: '900', marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { backgroundColor: '#0B1E2D', width: '48%', padding: 20, borderRadius: 20, marginBottom: 15, borderWidth: 1, borderColor: '#1E3A56' },
  iconBox: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  cardText: { color: '#FFF', fontWeight: '800', fontSize: 12, letterSpacing: 0.5 },
  scanAction: { marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#071521', padding: 15, borderRadius: 15 },
  scanText: { color: Colors.primary, fontWeight: '700', marginRight: 10 }
});

export default DashboardScreen;