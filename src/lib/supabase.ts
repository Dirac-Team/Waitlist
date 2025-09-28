import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a dummy client if environment variables are not set
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url_here') {
    console.warn('Supabase environment variables not configured. Using dummy client.');
    return createClient('https://dummy.supabase.co', 'dummy-key');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

// Database types
export interface WaitlistEntry {
  id: string;
  email: string;
  status: 'pending' | 'invited' | 'joined';
  created_at: string;
}