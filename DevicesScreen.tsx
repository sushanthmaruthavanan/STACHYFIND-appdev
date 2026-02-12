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
import { deviceService } from '../services/device.service';

const DevicesScreen = ({ navigation }: any) => {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    setLoading(true);
    const { data, error } = await deviceService.getMyDevices();
    if (error) {
      Alert.alert("Sync Error", "Could not retrieve your devices.");
    } else {
      setDevices(data || []);
    }
    setLoading(false);
  };

  const renderDevice = ({ item }: { item: any }) => (
    <View style={styles.deviceCard}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons 
          name="router-wireless" 
          size={24} 
          color={item.status === 'online' ? Colors.primary : Colors.subtitle} 
        />
      </View>
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{item.device_name}</Text>
        <Text style={styles.deviceId}>ID: {item.hardware_id}</Text>
      </View>
      <View style={styles.statusGroup}>
        <View style={[styles.statusDot, item.status === 'online' && styles.statusOnline]} />
        <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
      </View>
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>MY DEVICES</Text>
        <TouchableOpacity onPress={loadDevices}>
          <MaterialCommunityIcons name="refresh" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDevice}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="bluetooth-audio" size={60} color="#1E3A56" />
              <Text style={styles.emptyText}>No devices linked to your account.</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity 
        style={styles.scanButton}
        onPress={() => Alert.alert("Bluetooth Scan", "Searching for nearby Stachy nodes...")}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#000" />
        <Text style={styles.scanButtonText}>ADD NEW DEVICE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 20 },
  title: { color: Colors.primary, fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  deviceCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#0B1E2D', 
    padding: 20, 
    borderRadius: 16, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1E3A56'
  },
  iconCircle: { width: 45, height: 45, borderRadius: 23, backgroundColor: '#071521', justifyContent: 'center', alignItems: 'center' },
  deviceInfo: { flex: 1, marginLeft: 15 },
  deviceName: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  deviceId: { color: Colors.subtitle, fontSize: 11, marginTop: 2 },
  statusGroup: { alignItems: 'flex-end' },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.subtitle, marginBottom: 4 },
  statusOnline: { backgroundColor: '#10B981' },
  statusText: { color: Colors.subtitle, fontSize: 9, fontWeight: '800' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: Colors.subtitle, marginTop: 20, textAlign: 'center' },
  scanButton: { 
    position: 'absolute', 
    bottom: 30, 
    left: 20, 
    right: 20, 
    backgroundColor: Colors.primary, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 18,
    borderRadius: 15
  },
  scanButtonText: { color: '#000', fontWeight: '900', marginLeft: 10, letterSpacing: 1 }
});

export default DevicesScreen;