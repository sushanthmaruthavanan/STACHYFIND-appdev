import { supabase } from '../lib/supabase';

export const reportService = {
  getWeeklySummary: async () => {
    // Queries the weekly view or aggregate table
    return await supabase
      .from('weekly_mold_reports') 
      .select('*')
      .single(); 
  }
};