import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// Providing fallbacks to prevent top-level crashes if env vars are missing during initial dev load
export const supabase = createClient(
	PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
	PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);
