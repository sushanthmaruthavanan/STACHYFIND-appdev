import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { reportService } from '../services/report.service';

const ReportsScreen = ({ navigation }: any) => {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    setLoading(true);
    // Connecting to the report service backend logic
    const { data, error } = await reportService.getWeeklySummary();
    
    if (error) {
      Alert.alert("Error", "Could not retrieve report data.");
    } else {
      setReportData(data);
    }
    setLoading(false);
  };

  const handleExport = () => {
    Alert.alert("Export", "Report has been prepared and sent to your registered email.");
  };

  return (
    <View style={GlobalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WEEKLY REPORTS</Text>
        <TouchableOpacity onPress={handleExport}>
          <MaterialCommunityIcons name="export-variant" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 100 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Summary Overview */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>AVERAGE HUMIDITY</Text>
            <Text style={styles.cardValue}>68%</Text>
            <Text style={styles.statusText}>Moderate Risk</Text>
          </View>

          {/* Insights Section */}
          <View style={styles.insightSection}>
            <Text style={styles.sectionTitle}>MOLD RISK ANALYSIS</Text>
            <View style={styles.insightRow}>
              <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#FBBF24" />
              <Text style={styles.insightText}>Higher risk levels detected on Tuesday evening.</Text>
            </View>
            <View style={styles.insightRow}>
              <MaterialCommunityIcons name="check-decagram" size={20} color="#10B981" />
              <Text style={styles.insightText}>Average levels are 5% lower than last week.</Text>
            </View>
          </View>

          {/* Export Action Card */}
          <TouchableOpacity style={styles.exportCard} onPress={handleExport}>
            <View>
              <Text style={styles.exportTitle}>Download Full Data</Text>
              <Text style={styles.exportSubtitle}>CSV Format • Last 7 Days</Text>
            </View>
            <MaterialCommunityIcons name="download-circle" size={40} color={Colors.primary} />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 20 
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: Colors.primary, letterSpacing: 2 },
  card: { 
    backgroundColor: '#0B1E2D', 
    padding: 25, 
    borderRadius: 20, 
    alignItems: 'center', 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1E3A56'
  },
  cardLabel: { color: Colors.subtitle, fontSize: 12, letterSpacing: 1 },
  cardValue: { color: '#FFF', fontSize: 48, fontWeight: '900', marginVertical: 10 },
  statusText: { color: '#FBBF24', fontWeight: '700' },
  insightSection: { padding: 10, marginBottom: 30 },
  sectionTitle: { color: Colors.primary, fontSize: 14, fontWeight: '800', marginBottom: 15 },
  insightRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  insightText: { color: '#FFF', marginLeft: 10, fontSize: 14, flex: 1 },
  exportCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#071521', 
    padding: 20, 
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary
  },
  exportTitle: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  exportSubtitle: { color: Colors.subtitle, fontSize: 12, marginTop: 4 }
});

export default ReportsScreen;