// src/screens/DevicesScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

// Backend Service Only
import { deviceService } from '../services/device.service'; 

const DevicesScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // State for Cloud Monitoring (device.service.ts)
  const [cloudInfo, setCloudInfo] = useState({ online: false, lastSeen: 'Connecting...' });

  const syncWithBackend = async () => {
    const status = await deviceService.getDeviceStatus();
    setCloudInfo(status);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    syncWithBackend();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    syncWithBackend();
  };

  return (
    <View style={GlobalStyles.container}>
      <ScrollView 
        contentContainerStyle={GlobalStyles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
        }
      >
        
        {/* BACK TO HUB LINK */}
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.primary} />
          <Text style={styles.backText}>COMMAND HUB</Text>
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <View>
            <Text style={GlobalStyles.title}>Devices</Text>
            <Text style={GlobalStyles.subtitle}>Network Status Registry</Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />
        ) : (
          <View>
            {/* MAIN CLOUD INTEGRITY CARD */}
            <View style={[GlobalStyles.card, styles.cloudCard]}>
              <View style={styles.row}>
                <MaterialCommunityIcons 
                  name={cloudInfo.online ? "server-network" : "server-network-off"} 
                  size={28} 
                  color={cloudInfo.online ? Colors.success : Colors.danger} 
                />
                <View style={{ marginLeft: 15 }}>
                  <Text style={[styles.statusTitle, { color: cloudInfo.online ? Colors.success : Colors.danger }]}>
                    {cloudInfo.online ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
                  </Text>
                  <Text style={styles.statusText}>
                    Last Heartbeat: {cloudInfo.lastSeen}
                  </Text>
                </View>
              </View>
            </View>

            {/* DEVICE DETAILS CARD */}
            <View style={GlobalStyles.card}>
              <Text style={GlobalStyles.cardSubtitle}>Node Information</Text>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Identifier</Text>
                <Text style={styles.detailValue}>ESP32-STACHY-01</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Connection Type</Text>
                <Text style={styles.detailValue}>Wi-Fi (WPA2)</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Database Sync</Text>
                <Text style={[styles.detailValue, { color: Colors.success }]}>Active</Text>
              </View>
            </View>
            
            <Text style={styles.hintText}>Pull down to manually refresh node status</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  backText: { color: Colors.primary, fontWeight: '900', fontSize: 11, marginLeft: 5, letterSpacing: 1.5 },
  headerRow: { marginBottom: 30 },
  cloudCard: { 
    backgroundColor: 'rgba(255,255,255,0.02)', 
    padding: 20, 
    marginBottom: 20, 
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  statusTitle: { fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  statusText: { color: Colors.subtitle, fontSize: 13, marginTop: 4 },
  detailRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(255,255,255,0.05)' 
  },
  detailLabel: { color: Colors.subtitle, fontSize: 14 },
  detailValue: { color: Colors.text, fontSize: 14, fontWeight: 'bold' },
  hintText: { color: Colors.subtitle, fontSize: 12, textAlign: 'center', marginTop: 20, fontStyle: 'italic' }
});

export default DevicesScreen;