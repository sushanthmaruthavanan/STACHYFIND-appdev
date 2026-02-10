// src/screens/AlertsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { alertService, AlertType } from '../services/alert.service'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AlertsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const data = await alertService.getAlertHistory();
      
      if (data && data.length > 0) {
        setAlerts(data);
      } else {
        // Correctly typed Mock Data as a fallback
        const mockAlerts: any[] = [
          { id: '1', title: 'High Mold Risk Detected', msg: 'Humidity and temperature favor mold growth.', type: 'high', created_at: new Date().toISOString() },
          { id: '2', title: 'High Humidity Alert', msg: 'Humidity crossed 80%.', type: 'medium', created_at: new Date().toISOString() },
          { id: '3', title: 'Temperature Warning', msg: 'Temperature above safe indoor range.', type: 'medium', created_at: new Date().toISOString() },
          { id: '4', title: 'Sensor Disconnected', msg: 'ESP32 device not responding.', type: 'high', created_at: new Date().toISOString() },
        ];
        setAlerts(mockAlerts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertStyle = (type: string) => {
    switch(type) {
      case 'high': return { color: Colors.danger, icon: 'alert-circle' };
      case 'medium': return { color: Colors.warning, icon: 'alert' };
      default: return { color: Colors.success, icon: 'check-circle' };
    }
  };

  if (loading) {
    return (
      <View style={[GlobalStyles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Alerts</Text>
            <Text style={styles.subtitle}>Mold & Environment Notifications</Text>
          </View>
          <TouchableOpacity onPress={loadAlerts} style={styles.refreshBtn}>
             <MaterialCommunityIcons name="refresh" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {alerts.map((item) => {
          const style = getAlertStyle(item.type);
          return (
            <TouchableOpacity key={item.id} style={styles.alertCard} activeOpacity={0.7}>
              <View style={[styles.indicator, { backgroundColor: style.color }]} />
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name={style.icon as any} size={28} color={style.color} />
              </View>
              <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.alertTitle} numberOfLines={1}>{item.title}</Text>
                  <View style={[styles.badge, { backgroundColor: style.color + '20' }]}>
                    <Text style={[styles.badgeText, { color: style.color }]}>{item.type.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={styles.alertMsg}>{item.msg}</Text>
                <Text style={styles.alertTime}>
                  {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
  title: { fontSize: 32, fontWeight: 'bold', color: Colors.text },
  subtitle: { fontSize: 14, color: Colors.subtitle, marginTop: 4 },
  refreshBtn: { backgroundColor: Colors.cardBackground, padding: 10, borderRadius: 10 },
  
  alertCard: { 
    backgroundColor: Colors.cardBackground, 
    borderRadius: 18, 
    flexDirection: 'row', 
    padding: 16, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    position: 'relative',
    overflow: 'hidden'
  },
  indicator: { width: 4, height: '60%', position: 'absolute', left: 0, top: '20%', borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  iconContainer: { justifyContent: 'center', marginRight: 15 },
  textContainer: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  alertTitle: { color: Colors.text, fontSize: 16, fontWeight: 'bold', flex: 1, marginRight: 10 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: '800' },
  alertMsg: { color: Colors.subtitle, fontSize: 13, lineHeight: 18 },
  alertTime: { color: Colors.subtitle, fontSize: 11, marginTop: 8, opacity: 0.6 }
});

export default AlertsScreen;