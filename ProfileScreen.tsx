import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../theme/GlobalStyles';
import { Colors } from '../theme/colors';
import { profileService } from '../services/profile.service';
import { authService } from '../services/auth.service';

const ProfileScreen = ({ navigation }: any) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    const { data, error } = await profileService.getProfile();
    
    if (error) {
      Alert.alert("Error", "Could not load profile information.");
    } else {
      setProfile(data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Log Out", 
        onPress: async () => {
          await authService.signOut();
          navigation.replace('Login'); 
        },
        style: "destructive"
      }
    ]);
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
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {profile?.fullName?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{profile?.fullName}</Text>
        <Text style={styles.userEmail}>{profile?.email}</Text>
      </View>

      {/* Settings Options */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="account-edit" size={24} color={Colors.primary} />
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialCommunityIcons name="shield-lock" size={24} color={Colors.primary} />
          <Text style={styles.menuText}>Security Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={loadProfile}>
          <MaterialCommunityIcons name="refresh" size={24} color={Colors.primary} />
          <Text style={styles.menuText}>Refresh Data</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Action */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
        <Text style={styles.logoutText}>TERMINATE SESSION</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 40 },
  avatarCircle: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: Colors.primary, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 15
  },
  avatarText: { fontSize: 40, fontWeight: '900', color: '#000' },
  userName: { fontSize: 24, fontWeight: '800', color: '#FFF' },
  userEmail: { fontSize: 14, color: Colors.subtitle, marginTop: 5 },
  menu: { marginTop: 20 },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#0B1E2D', 
    padding: 18, 
    borderRadius: 15, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1E3A56'
  },
  menuText: { color: '#FFF', marginLeft: 15, fontSize: 16, fontWeight: '600' },
  logoutButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 'auto', 
    marginBottom: 40,
    padding: 20
  },
  logoutText: { color: '#EF4444', fontWeight: '800', marginLeft: 10, letterSpacing: 1 }
});

export default ProfileScreen;