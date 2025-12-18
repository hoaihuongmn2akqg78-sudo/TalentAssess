import { createClient } from '@supabase/supabase-js';

// Lấy trực tiếp biến môi trường.
// Bắt buộc phải viết rõ 'process.env.NEXT_PUBLIC_...' để Vercel hiểu.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Kiểm tra nhanh xem có thiếu biến không (để debug dễ hơn)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Lỗi: Thiếu biến môi trường Supabase. Hãy kiểm tra lại Vercel Settings.'
  );
}

// Khởi tạo Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);