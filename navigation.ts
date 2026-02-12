/**
 * RootStackParamList defines the available routes and the 
 * parameters expected by each screen. 
 * 'undefined' means the screen doesn't require any props to open.
 */

export type RootStackParamList = {
  // Auth Stack
  Login: undefined;
  Signup: undefined;

  // Main App (Bottom Tab Navigator)
  MainTabs: undefined;

  // Core Functional Screens
  Dashboard: undefined;
  SensorData: undefined;
  LiveData: undefined;
  Reports: undefined;
  Alerts: undefined;
  Devices: undefined;
  Profile: undefined;
  
  // Example of a screen with params (if needed later)
  // DeviceDetails: { deviceId: string }; 
};

/**
 * Global declaration to allow useNavigation() hook 
 * to be automatically typed throughout the app.
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}