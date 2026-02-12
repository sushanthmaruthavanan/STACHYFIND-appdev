import { supabase } from '../lib/supabase';

export const sensorService = {
  getHistory: async (limit = 30) => {
    try {
      const { data, error } = await supabase
        .from('sensor_data')
        .select('*')
        // Ordering by date then time to get the most recent logs first
        .order('date', { ascending: false })
        .order('time', { ascending: false })
        .limit(limit);

      return { data, error };
    } catch (err) {
      return { data: null, error: { message: "Database link failed" } };
    }
  }
};