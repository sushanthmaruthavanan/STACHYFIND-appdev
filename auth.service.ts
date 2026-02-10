import { supabase } from '../lib/supabase';

export const authService = {
  /**
   * Standard Sign In
   * Resolves the 'createClient of null' by assuming supabase is initialized
   */
  signIn: async (email: string, pass: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: pass,
      });

      if (error) {
        // Handle common security lockout
        if (error.status === 429) {
          return { error: "Security Lock: Too many attempts. Wait 15 minutes." };
        }
        return { error: error.message };
      }

      return { user: data.user, session: data.session };
    } catch (err: any) {
      return { error: "Connection Failed. Check your network or .env config." };
    }
  },

  /**
   * Advanced Sign Up
   * Stores 'full_name' in user metadata so it can be used on the Profile/Dashboard
   */
  register: async (email: string, pass: string, fullName: string) => {
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

      if (error) {
        if (error.status === 429) {
          return { error: { message: "Sign-up limit reached. Please try again later." } };
        }
        return { error };
      }

      return { data, error: null };
    } catch (err: any) {
      return { error: { message: "Registration failed due to a system error." } };
    }
  },

  /**
   * Sign Out
   */
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  /**
   * Get Current User
   * Useful for the Dashboard and Profile screens
   */
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};