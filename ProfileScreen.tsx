// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { profileService } from '../services/profile.service';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ email: '', full_name: '' });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileService.getUserProfile();
      if (data) {
        setProfile({
          email: data.email || '',
          full_name: data.full_name || 'Stachy User',
        });
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await profileService.signOut();
      navigation.replace('Login');
    } catch (error: any) {
      Alert.alert('Error signing out', error.message);
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <MaterialCommunityIcons name="account" size={60} color={Colors.primary} />
          </View>
          <Text style={styles.profileName}>{profile.full_name}</Text>
          <Text style={styles.emailText}>{profile.email}</Text>
        </View>

        {/* Account Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <View style={GlobalStyles.card}>
            <Text style={GlobalStyles.cardSubtitle}>Full Name</Text>
            <TextInput 
              style={styles.editableInput}
              value={profile.full_name}
              onChangeText={(txt) => setProfile({...profile, full_name: txt})}
              placeholderTextColor={Colors.subtitle}
            />
          </View>

          {/* Menu Options */}
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="bell-ring-outline" size={24} color={Colors.primary} />
            <Text style={styles.menuText}>Push Notifications</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.subtitle} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="shield-lock-outline" size={24} color={Colors.primary} />
            <Text style={styles.menuText}>Security & Privacy</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.subtitle} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleSignOut}
        >
          <MaterialCommunityIcons name="logout" size={20} color={Colors.danger} />
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 30 },
  avatarCircle: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: Colors.cardBackground, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  profileName: { fontSize: 24, fontWeight: 'bold', color: Colors.text },
  emailText: { color: Colors.subtitle, fontSize: 14, marginTop: 4 },
  section: { marginTop: 10 },
  sectionTitle: { color: Colors.primary, fontSize: 16, fontWeight: '700', marginBottom: 15 },
  editableInput: { color: Colors.text, fontSize: 18, fontWeight: '600', marginTop: 5 },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: Colors.cardBackground, 
    padding: 18, 
    borderRadius: 15, 
    marginBottom: 12 
  },
  menuText: { flex: 1, color: Colors.text, fontSize: 16, marginLeft: 15, fontWeight: '500' },
  logoutButton: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)', 
    padding: 16, 
    borderRadius: 15, 
    marginTop: 20 
  },
  logoutText: { color: Colors.danger, fontSize: 16, fontWeight: 'bold', marginLeft: 10 }
});

export default ProfileScreen;