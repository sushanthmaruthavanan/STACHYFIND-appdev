import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { authService } from '../services/auth.service';

const SignupScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    // 1. Validation
    if (!fullName || !email || !password) {
      Alert.alert("Required Fields", "Please provide your name, email, and a password.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Security", "Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    // 2. Auth Service Call
    const { data, error } = await authService.register(email, password, fullName);
    
    setLoading(false);

    if (error) {
      // Handles the 429 lockout or existing email errors
      Alert.alert("Registration Failed", error.message);
    } else {
      // 3. Success Routing
      Alert.alert(
        "Verification Required",
        "Registration successful! Please check your email to verify your account before logging in.",
        [{ text: "OK", onPress: () => navigation.navigate('Login') }]
      );
    }
  };

  return (
    <ScrollView style={GlobalStyles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.logoContainer}>
        <Text style={styles.brandName}>STACHY</Text>
        <Text style={styles.tagline}>Intelligent Mold Risk Platform</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={GlobalStyles.input}
          placeholder="Full name"
          placeholderTextColor={Colors.subtitle}
          value={fullName}
          onChangeText={setFullName}
        />

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
            placeholder="Create password"
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
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={GlobalStyles.buttonText}>CREATE ACCOUNT</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footer} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.footerText}>
            Already registered? <Text style={styles.linkText}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: { alignItems: 'center', marginTop: 60, marginBottom: 40 },
  brandName: { fontSize: 48, fontWeight: '900', color: Colors.primary, letterSpacing: 8 },
  tagline: { fontSize: 16, color: Colors.text, marginTop: 10, opacity: 0.8 },
  form: { paddingBottom: 40 },
  passwordWrapper: { flexDirection: 'row', alignItems: 'center' },
  showBtnWrapper: { position: 'absolute', right: 15, top: 15 },
  showBtn: { color: Colors.primary, fontWeight: '700', fontSize: 12 },
  footer: { marginTop: 30, alignItems: 'center' },
  footerText: { color: Colors.text, fontSize: 14 },
  linkText: { color: Colors.primary, fontWeight: '700' }
});

export default SignupScreen;