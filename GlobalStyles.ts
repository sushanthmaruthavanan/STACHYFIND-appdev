// src/theme/GlobalStyles.ts
import { StyleSheet, TextStyle, ViewStyle, Dimensions } from 'react-native';
import { Colors } from './colors';

const { width } = Dimensions.get('window');

type Style = {
  container: ViewStyle;
  scrollContent: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  card: ViewStyle;
  cardText: TextStyle;
  cardSubtitle: TextStyle;
  sensorValue: TextStyle;
  statusBadge: ViewStyle;
  statusText: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  input: ViewStyle;
  inputText: TextStyle;
  divider: ViewStyle;
};

export const GlobalStyles = StyleSheet.create<Style>({
  // Main background with deep space blue
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // Advanced Typography
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.subtitle,
    marginTop: 4,
    marginBottom: 24,
    fontWeight: '500',
  },
  // Glassmorphism Card Design
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 28,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)', // High-tech glass edge
    // Glowing shadow effect
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  cardText: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    fontSize: 13,
    color: Colors.subtitle,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  // Data Visualization Styling
  sensorValue: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.primary,
    textShadowColor: 'rgba(0, 212, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15, // Neon glow effect
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  // Advanced Interactive Elements
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: Colors.background, // Contrast color
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 20,
    width: '100%',
  },
});