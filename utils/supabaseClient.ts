import { createClient } from '@supabase/supabase-js';

// 1. Get Environment Variables securely
// We prioritize the NEXT_PUBLIC_ vars as seen in your Vercel screenshots
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. Debugging: Log to console if variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'CRITICAL ERROR: Supabase Environment Variables are missing.',
    'Please check your Vercel Settings or .env.local file.',
    { supabaseUrl, supabaseAnonKey } // Log values to check which one is undefined
  );
}

// 3. Create Client with a "Fallback" to prevent app crash
// If variables are missing, we pass an empty string to allow the app to build,
// but data fetching will fail gracefully later instead of crashing the whole site.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);