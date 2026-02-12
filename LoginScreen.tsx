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
  Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { authService } from '../services/auth.service';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Info", "Please provide both email and password.");
      return;
    }

    setLoading(true);
    const { user, error } = await authService.signIn(email, password);

    if (error) {
      setLoading(false);
      Alert.alert("Access Denied", error);
    } else if (user) {
      setLoading(false);
      // navigation.replace ensures the user can't go back to login
      navigation.replace('Dashboard'); 
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        {/* Branding Section */}
        <View style={styles.headerSection}>
          <View style={styles.logoGlow}>
            <MaterialCommunityIcons name="shield-search" size={60} color={Colors.primary} />
          </View>
          <Text style={styles.brandTitle}>STACHY</Text>
          <Text style={styles.brandSubtitle}>Environmental Risk Intelligence</Text>
        </View>

        {/* Glassmorphism Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>IDENTIFICATION</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="email-outline" size={20} color={Colors.primary} style={styles.inputIcon} />
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

          <Text style={styles.inputLabel}>SECURITY KEY</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="lock-outline" size={20} color={Colors.primary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#4B5563"
              secureTextEntry={secureText}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <MaterialCommunityIcons 
                name={secureText ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color={Colors.subtitle} 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.loginButtonText}>INITIATE ACCESS</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerText}>
              Need credentials? <Text style={styles.linkText}>Register Node</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030712' },
  innerContainer: { flex: 1, padding: 25, justifyContent: 'center' },
  headerSection: { alignItems: 'center', marginBottom: 50 },
  logoGlow: {
    padding: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  brandTitle: { color: '#FFF', fontSize: 32, fontWeight: '900', letterSpacing: 6, marginTop: 20 },
  brandSubtitle: { color: Colors.subtitle, fontSize: 12, fontWeight: '600', letterSpacing: 1.5 },
  formCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 24,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputLabel: { color: Colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 2, marginBottom: 8, marginLeft: 5 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1E293B'
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: '#FFF', fontSize: 15 },
  loginButton: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },
  buttonDisabled: { opacity: 0.6 },
  loginButtonText: { color: '#000', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
  footer: { marginTop: 30, alignItems: 'center' },
  footerText: { color: Colors.subtitle, fontSize: 14 },
  linkText: { color: Colors.primary, fontWeight: '800' }
});

export default LoginScreen;
