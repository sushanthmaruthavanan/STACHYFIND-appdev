import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { liveSensorService } from '../services/livesensordata.service';

const LiveDataScreen = ({ navigation }: any) => {
  const [currentData, setCurrentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // 1. Get Initial State
    const initData = async () => {
      const { data } = await liveSensorService.getLatestReading();
      if (data) setCurrentData(data);
      setLoading(false);
    };

    initData();

    // 2. Start Real-time Subscription
    const subscription = liveSensorService.subscribeToSensorUpdates((newData) => {
      setCurrentData(newData);
      setIsLive(true);
      // Visual feedback: Flash live indicator
      setTimeout(() => setIsLive(false), 1000);
    });

    // 3. Cleanup on Unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={[GlobalStyles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.statusBadge}>
          <View style={[styles.dot, isLive && styles.dotActive]} />
          <Text style={styles.statusText}>{isLive ? 'RECEIVING' : 'MONITORING'}</Text>
        </View>
      </View>

      <View style={styles.mainGauge}>
        <Text style={styles.label}>CURRENT HUMIDITY</Text>
        <Text style={styles.reading}>{currentData?.humidity || '--'}%</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaBox}>
            <MaterialCommunityIcons name="thermometer" size={20} color={Colors.subtitle} />
            <Text style={styles.metaValue}>{currentData?.temperature || '--'}°C</Text>
          </View>
          <View style={styles.metaBox}>
            <MaterialCommunityIcons name="molecule" size={20} color={Colors.subtitle} />
            <Text style={styles.metaValue}>{currentData?.risk_score || '--'}% Risk</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>System Analysis</Text>
        <Text style={styles.infoDesc}>
          Values are updated in real-time via the Stachy-Find mesh network.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0B1E2D', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4B5563', marginRight: 8 },
  dotActive: { backgroundColor: '#10B981' },
  statusText: { color: '#FFF', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  mainGauge: { alignItems: 'center', marginTop: 60, padding: 40, backgroundColor: '#0B1E2D', borderRadius: 100, width: 300, height: 300, alignSelf: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#1E3A56' },
  label: { color: Colors.subtitle, fontSize: 12, fontWeight: '700' },
  reading: { color: Colors.primary, fontSize: 72, fontWeight: '900', marginVertical: 10 },
  metaRow: { flexDirection: 'row', marginTop: 10 },
  metaBox: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
  metaValue: { color: '#FFF', marginLeft: 5, fontWeight: '600' },
  infoCard: { backgroundColor: '#071521', padding: 20, borderRadius: 16, marginTop: 60, borderLeftWidth: 4, borderLeftColor: Colors.primary },
  infoTitle: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  infoDesc: { color: Colors.subtitle, marginTop: 5, lineHeight: 20 }
});

export default LiveDataScreen;