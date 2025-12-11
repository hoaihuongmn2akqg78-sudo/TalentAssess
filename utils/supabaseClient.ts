import { createClient } from '@supabase/supabase-js';

// Helper to safely access environment variables in various environments
const getEnvVar = (key: string): string => {
  let value = '';
  
  // 1. Try process.env (Standard Node/Webpack/Vercel)
  if (typeof process !== 'undefined' && process.env) {
    value = process.env[key] || 
            process.env[`VITE_${key}`] || 
            process.env[`NEXT_PUBLIC_${key}`] || 
            process.env[`REACT_APP_${key}`] || 
            '';
  }

  // 2. Try import.meta.env (Vite)
  if (!value) {
    try {
      // @ts-ignore
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        // @ts-ignore
        value = import.meta.env[key] || import.meta.env[`VITE_${key}`] || '';
      }
    } catch (e) {
      // Ignore errors if import.meta is not accessible
    }
  }

  return value;
};

// Configuration
// We use the provided URL as the default to fix the "supabaseUrl is required" error
const DEFAULT_SUPABASE_URL = 'https://upwdemshkhbvicyvsftc.supabase.co';
const supabaseUrl = getEnvVar('SUPABASE_URL') || DEFAULT_SUPABASE_URL;

// We use a placeholder key if none is found to prevent the client from crashing on initialization.
// Note: Real database operations will fail with 401 Unauthorized until a valid key is provided.
const supabaseAnonKey = getEnvVar('SUPABASE_ANON_KEY') || 'placeholder-anon-key';

if (supabaseAnonKey === 'placeholder-anon-key') {
  console.warn(
    'Supabase Anon Key is missing. Database operations will likely fail. ' +
    'Please set VITE_SUPABASE_ANON_KEY in your project settings.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);