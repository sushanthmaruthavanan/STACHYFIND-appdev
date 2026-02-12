import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { authService } from '../services/auth.service';

const SignupScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Missing Fields", "All identification fields are required.");
      return;
    }

    setLoading(true);
    // Passing full_name to Supabase user_metadata
    const { error } = await authService.register(email, password, fullName);

    if (error) {
      setLoading(false);
      Alert.alert("Registry Error", error);
    } else {
      setLoading(false);
      Alert.alert("Success", "Node registered. Check email for verification.", [
        { text: "Return to Login", onPress: () => navigation.navigate('Login') }
      ]);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>NODE REGISTRY</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>OPERATOR FULL NAME</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="account-outline" size={20} color={Colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Sushanth M"
              placeholderTextColor="#4B5563"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <Text style={styles.label}>CREDENTIAL EMAIL</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="email-outline" size={20} color={Colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="operator@stachy.com"
              placeholderTextColor="#4B5563"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.label}>SECURITY PASS</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="shield-key-outline" size={20} color={Colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#4B5563"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity 
            style={[styles.btn, loading && styles.btnDisabled]} 
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.btnText}>REGISTER SYSTEM</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030712' },
  scrollContent: { padding: 25, justifyContent: 'center', flexGrow: 1 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 40, marginTop: 20 },
  backBtn: { marginRight: 20 },
  title: { color: '#FFF', fontSize: 24, fontWeight: '900', letterSpacing: 3 },
  formCard: { backgroundColor: 'rgba(31, 41, 55, 0.4)', borderRadius: 24, padding: 25, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  label: { color: Colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 2, marginBottom: 8, marginLeft: 5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', borderRadius: 12, paddingHorizontal: 15, height: 55, marginBottom: 20, borderWidth: 1, borderColor: '#1E293B' },
  icon: { marginRight: 12 },
  input: { flex: 1, color: '#FFF', fontSize: 15 },
  btn: { backgroundColor: Colors.primary, height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#000', fontWeight: '900', fontSize: 16, letterSpacing: 1 }
});

export default SignupScreen;