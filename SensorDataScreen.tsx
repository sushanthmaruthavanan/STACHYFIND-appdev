import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  RefreshControl 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// ✅ Importing the interface we just added to the service
import { sensorService, SensorRecord } from '../services/sensor.service';

const SensorDataScreen = ({ navigation }: any) => {
  const [history, setHistory] = useState<SensorRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const data = await sensorService.getRecentAnalytics();
    setHistory(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const renderItem = ({ item }: { item: SensorRecord }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={[
          styles.badge, 
          { backgroundColor: item.mold_risk_category === 'low' ? '#065F46' : '#991B1B' }
        ]}>
          <Text style={styles.badgeText}>{item.mold_risk_category.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <MaterialCommunityIcons name="thermometer" size={20} color="#38BDF8" />
          <Text style={styles.statValue}>{item.temperature}°C</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <MaterialCommunityIcons name="water-percent" size={20} color="#38BDF8" />
          <Text style={styles.statValue}>{item.humidity}%</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#38BDF8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ANALYSIS LOGS</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#38BDF8" />
          <Text style={styles.loadingText}>Syncing with Server...</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#38BDF8" />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No sensor readings found.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050B12' },
  header: { paddingTop: 60, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { padding: 5 },
  headerTitle: { color: '#38BDF8', fontSize: 18, fontWeight: '900', marginLeft: 10, letterSpacing: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#94A3B8', marginTop: 15, fontWeight: '700' },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { backgroundColor: '#0B1E2D', padding: 20, borderRadius: 20, marginBottom: 15, borderWidth: 1, borderColor: '#1E3A56' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  dateText: { color: '#64748B', fontSize: 10, fontWeight: '800' },
  timeText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#1E3A56' },
  statBox: { flexDirection: 'row', alignItems: 'center' },
  statValue: { color: '#FFF', fontSize: 20, fontWeight: '900', marginLeft: 8 },
  divider: { width: 1, height: 20, backgroundColor: '#1E3A56' },
  emptyText: { color: '#64748B', textAlign: 'center', marginTop: 50, fontWeight: '700' }
});

export default SensorDataScreen;