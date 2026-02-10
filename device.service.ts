import { supabase } from '../lib/supabase';

export const deviceService = {
  getDeviceStatus: async () => {
    const { data, error } = await supabase
      .from('sensor_readings')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return { online: false, lastSeen: 'N/A' };

    const lastSeenDate = new Date(data.created_at);
    const now = new Date();
    
    // Calculate difference in minutes. If > 5 mins, hardware is offline.
    const diffInMinutes = (now.getTime() - lastSeenDate.getTime()) / 60000;

    return {
      online: diffInMinutes < 5,
      lastSeen: lastSeenDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: data.created_at
    };
  }
};