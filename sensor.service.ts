import { supabase } from '../lib/supabase';

// ✅ Add this export to fix the ts(2305) error
export interface SensorRecord {
  id: number;
  temperature: number;
  humidity: number;
  pressure?: number; // Optional fields based on your hardware
  light?: number;
  mold_risk_category: string;
  date: string;
  time: string;
}

export const sensorService = {
  /**
   * Fetches historical logs.
   * Resolves the 'public.sensor_readings' schema cache error.
   */
  getRecentAnalytics: async (): Promise<SensorRecord[]> => {
    const { data, error } = await supabase
      .from('sensor_readings') // Ensure you created this view in SQL
      .select('*')
      .order('id', { ascending: false })
      .limit(50);
      
    if (error) {
      console.error("Analytics Error:", error.message);
      return [];
    }
    return (data as SensorRecord[]) || [];
  },

  /**
   * Real-time subscription to sensor updates.
   * Fixes the Render Error in Log 3.
   */
  subscribeToSensor: (onUpdate: (payload: SensorRecord) => void) => {
    return supabase
      .channel('sensor-updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'sensor_data' },
        (payload) => onUpdate(payload.new as SensorRecord)
      )
      .subscribe();
  }
};