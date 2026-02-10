import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { reportService, ReportItem } from '../services/report.service';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ReportsScreen = ({ navigation }: any) => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const data = await reportService.getHistory();
    setReports(data);
    setLoading(false);
  };

  const renderReportItem = ({ item }: { item: ReportItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.timestamp}>{item.date} | {item.time}</Text>
        <View style={[
          styles.badge, 
          { backgroundColor: item.mold_risk_category === 'low' ? '#065F46' : '#991B1B' }
        ]}>
          <Text style={styles.badgeText}>{item.mold_risk_category.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>TEMPERATURE</Text>
          <Text style={styles.statValue}>{item.temperature}°C</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statLabel}>HUMIDITY</Text>
          <Text style={styles.statValue}>{item.humidity}%</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#38BDF8" />
        </TouchableOpacity>
        <Text style={styles.title}>INTELLIGENCE REPORTS</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#38BDF8" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderReportItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No historical records found on server.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050B12' },
  header: { paddingTop: 60, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  title: { color: '#38BDF8', fontSize: 20, fontWeight: '900', marginLeft: 10, letterSpacing: 1 },
  listContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  card: { backgroundColor: '#0B1E2D', padding: 20, borderRadius: 16, marginBottom: 15, borderWidth: 1, borderColor: '#1E3A56' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  timestamp: { color: '#94A3B8', fontSize: 12, fontWeight: '700' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  stat: { alignItems: 'center' },
  statLabel: { color: '#64748B', fontSize: 10, fontWeight: '800', marginBottom: 5 },
  statValue: { color: '#FFF', fontSize: 22, fontWeight: '900' },
  divider: { width: 1, height: 30, backgroundColor: '#1E3A56' },
  emptyText: { color: '#64748B', textAlign: 'center', marginTop: 50, fontWeight: '700' }
});

export default ReportsScreen;