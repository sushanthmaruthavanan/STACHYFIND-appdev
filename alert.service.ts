import { supabase } from '../lib/supabase';

export const alertService = {
  /**
   * Fetches all alerts for the user, prioritizing 'active' status.
   */
  getAlerts: async () => {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false });

      return { data, error: error?.message };
    } catch (err) {
      return { data: [], error: "Alert system sync failed." };
    }
  },

  /**
   * Marks a specific alert as acknowledged/read.
   */
  acknowledgeAlert: async (alertId: string) => {
    const { data, error } = await supabase
      .from('alerts')
      .update({ status: 'read' })
      .eq('id', alertId);

    return { data, error: error?.message };
  }
};