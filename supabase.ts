import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zxcgfzubayoazzekqmyb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4Y2dmenViYXlvYXp6ZWtxbXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NTg4NDAsImV4cCI6MjA4MDMzNDg0MH0.6MXNQTQoMVd27pwscaPnj8XSn9S97ZWXi6_QvHbeIPE';

// Ensure the client is exported as a constant to be used by all services
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});