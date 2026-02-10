import { supabase } from '../lib/supabase';

export const profileService = {
  // Get current user session and profile data
  getUserProfile: async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Profile fetch error:', error.message);
      return { email: user.email, full_name: 'User' }; // Fallback
    }

    return { email: user.email, ...data };
  },

  // Update Full Name
  updateProfileName: async (fullName: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, updated_at: new Date() })
      .eq('id', user.id);

    if (error) throw error;
  },

  // Sign out logic
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};