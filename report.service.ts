import { supabase } from '../lib/supabase';

export interface ReportItem {
  id: number;
  temperature: number;
  humidity: number;
  mold_risk_category: string;
  date: string;
  time: string;
}

export const reportService = {
  /**
   * Fetches historical logs from the database.
   */
  getHistory: async (): Promise<ReportItem[]> => {
    try {
      const { data, error } = await supabase
        .from('sensor_data') // Verified table from your dashboard
        .select('id, temperature, humidity, mold_risk_category, date, time')
        .order('id', { ascending: false })
        .limit(50);

      if (error) {
        console.error("Report Service Error:", error.message);
        return [];
      }
      return data as ReportItem[];
    } catch (err) {
      console.error("Failed to generate report data:", err);
      return [];
    }
  }
};