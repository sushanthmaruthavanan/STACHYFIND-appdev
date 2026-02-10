import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';

// ✅ Fixed Import: Matches your new filename and export names
import { liveSensorDataService, manager } from '../services/livesensordata.service';

const LiveDataScreen = () => {
  const [sensorData, setSensorData] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initBle = async () => {
      // 1. Check Permissions for Android
      if (Platform.OS === 'android' && Platform.Version >= 31) {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
      }

      // 2. Wait for Bluetooth to be ready before scanning
      manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          setIsReady(true);
          liveSensorDataService.connectToDevice((data) => {
            setSensorData(data);
          });
        }
      }, true);
    };

    initBle();
  }, []);

  return (
    <View style={styles.container}>
      {!isReady ? (
        <ActivityIndicator size="large" color="#38BDF8" />
      ) : (
        <Text style={styles.value}>{sensorData?.temperature ?? '--'}°C</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050B12', justifyContent: 'center', alignItems: 'center' },
  value: { color: '#FFF', fontSize: 48, fontWeight: 'bold' }
});

export default LiveDataScreen;