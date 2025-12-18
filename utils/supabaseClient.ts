import { createClient } from '@supabase/supabase-js';

// Thay thế trực tiếp chuỗi URL và KEY vào đây
// Bạn hãy vào Vercel copy và dán đè vào giữa 2 dấu nháy ''
const supabaseUrl = 'https://upwdemshkhbvicyvsftc.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwd2RlbXNoa2hidmljeXZzZnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNDQ1NjIsImV4cCI6MjA4MDkyMDU2Mn0.gy7vsxX5JrreODzKcYd8hENJEf0GvpP3iAyG-OvxzTA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);