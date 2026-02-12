import { supabase } from '../lib/supabase';

export const liveSensorService = {
  /**
   * Listens for real-time inserts into the sensor_data table.
   * @param onUpdate Callback function to handle the new data packet.
   */
  subscribeToSensorUpdates: (onUpdate: (newData: any) => void) => {
    return supabase
      .channel('live-monitor-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sensor_data', // Ensure this matches your Supabase table name
        },
        (payload) => {
          console.log('New Sensor Event:', payload.new);
          onUpdate(payload.new);
        }
      )
      .subscribe();
  },

  /**
   * Fetches the single latest reading to initialize the gauge.
   */
  getLatestReading: async () => {
    const { data, error } = await supabase
      .from('sensor_data')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    return { data, error: error?.message };
  }
};