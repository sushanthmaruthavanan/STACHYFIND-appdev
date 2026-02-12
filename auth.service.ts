import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

// Defining return types to resolve the ts(2339) and ts(2307) errors
interface AuthResponse {
  user: User | null;
  error: string | undefined;
}

interface RegisterResponse {
  data: { user: User | null; session: Session | null } | null;
  error: string | undefined;
}

/**
 * Authentication Service
 * Acts as the "Backend" controller for Login, Signup, and Dashboard
 */
export const authService = {
  /**
   * LOGIN: Standardized for LoginScreen handleLogin logic
   */
  signIn: async (email: string, pass: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: pass,
      });
      
      return { user: data.user, error: error?.message };
    } catch (err) {
      return { user: null, error: "Network or system error occurred." };
    }
  },

  /**
   * SIGNUP: Stores fullName in user_metadata for Dashboard display
   */
  register: async (email: string, pass: string, fullName: string): Promise<RegisterResponse> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: pass,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });
      
      return { data, error: error?.message };
    } catch (err) {
      return { data: null, error: "Registration system failed." };
    }
  },

  /**
   * DASHBOARD: Recovers session to personalize the UI
   */
  getCurrentUser: async (): Promise<AuthResponse> => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      return { user, error: error?.message };
    } catch (err) {
      return { user: null, error: "Session recovery failed." };
    }
  },

  /**
   * LOGOUT: Clears session and redirects to Login
   */
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message };
    } catch (err) {
      return { error: "Failed to terminate session." };
    }
  }
};