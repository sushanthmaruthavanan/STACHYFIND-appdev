import { supabase } from '../lib/supabase';

export interface AlertType {
  id: string;
  title: string;
  msg: string;
  type: 'high' | 'medium' | 'low';
  created_at: string;
}

export const alertService = {
  getAlertHistory: async (): Promise<AlertType[]> => {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Alert Engine Error:', error.message);
      return [];
    }
    return data as AlertType[];
  }
};