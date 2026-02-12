import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { alertService } from '../services/alert.service';

const AlertsScreen = ({ navigation }: any) => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setLoading(true);
    const { data, error } = await alertService.getAlerts();
    if (error) {
      console.error(error);
    } else {
      setAlerts(data || []);
    }
    setLoading(false);
  };

  const handleAcknowledge = async (id: string) => {
    const { error } = await alertService.acknowledgeAlert(id);
    if (!error) {
      setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'read' } : a));
    }
  };

  const renderAlert = ({ item }: { item: any }) => {
    const isCritical = item.severity === 'critical';
    const isRead = item.status === 'read';

    return (
      <TouchableOpacity 
        style={[styles.alertCard, isRead && styles.alertRead]}
        onPress={() => handleAcknowledge(item.id)}
      >
        <View style={[styles.severityBar, { backgroundColor: isCritical ? '#EF4444' : '#FBBF24' }]} />
        <View style={styles.alertContent}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>{item.title}</Text>
            <Text style={styles.alertTime}>{new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
          <Text style={styles.alertDesc}>{item.message}</Text>
        </View>
        {!isRead && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>NOTIFICATIONS</Text>
        <TouchableOpacity onPress={loadAlerts}>
          <MaterialCommunityIcons name="check-all" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAlert}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="bell-off-outline" size={60} color="#1E3A56" />
              <Text style={styles.emptyText}>No active alerts detected.</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20 },
  title: { color: Colors.primary, fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  alertCard: { 
    flexDirection: 'row', 
    backgroundColor: '#0B1E2D', 
    borderRadius: 16, 
    marginBottom: 12, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E3A56'
  },
  alertRead: { opacity: 0.6, borderColor: 'transparent' },
  severityBar: { width: 6 },
  alertContent: { flex: 1, padding: 16 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  alertTitle: { color: '#FFF', fontSize: 15, fontWeight: '800' },
  alertTime: { color: Colors.subtitle, fontSize: 11 },
  alertDesc: { color: Colors.subtitle, fontSize: 13, lineHeight: 18 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, alignSelf: 'center', marginRight: 15 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: Colors.subtitle, marginTop: 20, textAlign: 'center' }
});

export default AlertsScreen;