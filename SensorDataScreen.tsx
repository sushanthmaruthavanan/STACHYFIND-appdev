import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { sensorService } from '../services/sensor.service';

const SensorDataScreen = ({ navigation }: any) => {
  const [readings, setReadings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const { data, error } = await sensorService.getHistory(30);
    if (error) {
      Alert.alert("Sync Error", "Could not fetch data from sensor_data.");
    } else {
      setReadings(data || []);
    }
    setLoading(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.logCard}>
      <View>
        {/* Combining separate date and time columns from your dashboard */}
        <Text style={styles.logDate}>{item.date} | {item.time}</Text>
        <Text style={styles.logStatus}>Risk: {item.mold_risk_category || 'Low'}</Text>
      </View>
      <View style={styles.valueContainer}>
        {/* Using the specific 'humidity' column name from your DB */}
        <Text style={styles.logValue}>{item.humidity ?? '--'}%</Text>
        <Text style={styles.unitText}>RH</Text>
      </View>
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ANALYSIS</Text>
        <TouchableOpacity onPress={loadData}>
          <MaterialCommunityIcons name="refresh" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>LATEST HUMIDITY READING</Text>
        <Text style={styles.summaryValue}>
          {readings.length > 0 ? `${readings[0].humidity}%` : '---'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Historical Logs</Text>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={readings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

// Styles remain as previously defined
const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 30 },
  headerTitle: { fontSize: 20, fontWeight: '900', color: Colors.primary, letterSpacing: 2 },
  summaryCard: { backgroundColor: '#0B1E2D', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#1E3A56', marginBottom: 30 },
  summaryLabel: { color: Colors.subtitle, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  summaryValue: { color: '#FFF', fontSize: 42, fontWeight: '900', marginTop: 5 },
  sectionTitle: { color: Colors.primary, fontSize: 14, fontWeight: '800', marginBottom: 15 },
  listContent: { paddingBottom: 40 },
  logCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#071521', padding: 15, borderRadius: 12, marginBottom: 10 },
  logDate: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  logStatus: { color: Colors.subtitle, fontSize: 11, marginTop: 2 },
  valueContainer: { alignItems: 'flex-end' },
  logValue: { color: Colors.primary, fontSize: 18, fontWeight: '900' },
  unitText: { color: Colors.subtitle, fontSize: 10 }
});

export default SensorDataScreen;