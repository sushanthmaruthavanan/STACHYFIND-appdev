import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { authService } from '../services/auth.service';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // 1. Basic Validation
    if (!email || !password) {
      Alert.alert("Input Required", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    
    // 2. Authenticate via Supabase
    const { user, error } = await authService.signIn(email, password);
    
    setLoading(false);

    if (error) {
      // Handles the 'Security Lock' lockout from your logs
      Alert.alert("Access Denied", error);
    } else if (user) {
      // 3. Navigate to Dashboard (ensure the name matches RootNavigator)
      navigation.replace('Dashboard');
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.brandName}>STACHY</Text>
        <Text style={styles.tagline}>Smart Mold Risk Intelligence</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={GlobalStyles.input}
          placeholder="Email address"
          placeholderTextColor={Colors.subtitle}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View style={styles.passwordWrapper}>
          <TextInput
            style={[GlobalStyles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor={Colors.subtitle}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity 
            style={styles.showBtnWrapper} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.showBtn}>{showPassword ? 'HIDE' : 'SHOW'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[GlobalStyles.button, loading && { opacity: 0.7 }]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={GlobalStyles.buttonText}>ACCESS DASHBOARD</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footer} 
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.footerText}>
            New to STACHY? <Text style={styles.linkText}>Create account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: { alignItems: 'center', marginTop: 80, marginBottom: 50 },
  brandName: { fontSize: 48, fontWeight: '900', color: Colors.primary, letterSpacing: 8 },
  tagline: { fontSize: 16, color: Colors.text, marginTop: 10, opacity: 0.8 },
  form: { marginTop: 20 },
  passwordWrapper: { flexDirection: 'row', alignItems: 'center' },
  showBtnWrapper: { position: 'absolute', right: 15, top: 15 },
  showBtn: { color: Colors.primary, fontWeight: '700', fontSize: 12 },
  footer: { marginTop: 30, alignItems: 'center' },
  footerText: { color: Colors.text, fontSize: 14 },
  linkText: { color: Colors.primary, fontWeight: '700' }
});

export default LoginScreen;