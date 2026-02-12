import { supabase } from '../lib/supabase';

export const deviceService = {
  /**
   * Fetches all devices registered to the current user.
   */
  getMyDevices: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { data: [], error: "Not authenticated" };

      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .eq('owner_id', user.id)
        .order('last_online', { ascending: false });

      return { data, error: error?.message };
    } catch (err) {
      return { data: [], error: "Database connection failed" };
    }
  },

  /**
   * Registers a new Stachy node found via Bluetooth.
   */
  registerDevice: async (deviceName: string, hardwareId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('devices')
      .upsert({
        owner_id: user?.id,
        device_name: deviceName,
        hardware_id: hardwareId,
        status: 'online',
        last_online: new Date().toISOString()
      })
      .select();

    return { data, error: error?.message };
  }
};