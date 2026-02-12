import { supabase } from '../lib/supabase';

export const profileService = {
  /**
   * Fetches the current user's profile information from metadata
   */
  getProfile: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) return { data: null, error: error.message };
      
      // Returns metadata like full_name stored during signup
      return { 
        data: {
          email: user?.email,
          fullName: user?.user_metadata?.full_name || 'Stachy User',
          id: user?.id
        }, 
        error: null 
      };
    } catch (err) {
      return { data: null, error: "Initialization failed. Check network." };
    }
  },

  /**
   * Updates user metadata (e.g., changing display name)
   */
  updateProfile: async (newName: string) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { full_name: newName.trim() }
    });
    return { data, error: error?.message };
  }
};