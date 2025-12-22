// File: api/notify-zoho.js

// --- 1. CẤU HÌNH SẢN PHẨM ---
const PRODUCT_CONFIG = {
  // 1. APOLLO Profile (Link chuẩn)
  'APOLLO Profile': {
    type: 'apollo', 
    // Link này sẽ được gửi sang Zoho, bạn không cần nhập trong Excel nữa
    link: 'https://www.apollonean.com.au/apollo/servlet/abtwsac/apollo/ApolloEntryForm', 
  },

  // 2. MBTI® Step I - Profile Report (Link test)
  'MBTI® Step I - Profile Report': {
    type: 'mbti_step1_profile',
    link: 'https://online.cpp.com/en/index.aspx?R=MBTI_STEP1_PROFILE_TEST', 
  },

  // 3. MBTI® Step I - Interpretive Report for Organizations (Link test)
  'MBTI® Step I - Interpretive Report for Organizations': {
    type: 'mbti_step1_iro',
    link: 'https://online.cpp.com/en/index.aspx?R=MBTI_IRO_TEST', 
  },

  // 4. MBTI® Step II - Profile Report (Link test)
  'MBTI® Step II - Profile Report': {
    type: 'mbti_step2_profile',
    link: 'https://online.cpp.com/en/index.aspx?R=STEP2_PROFILE_TEST',
  },

  // 5. MBTI® Step II - Interpretive Report (Link test)
  'MBTI® Step II - Interpretive Report': {
    type: 'mbti_step2_interpretive',
    link: 'https://online.cpp.com/en/index.aspx?R=STEP2_INTERPRETIVE_TEST',
  },
};

export default async function handler(req, res) {
  // Chỉ cho phép phương thức POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const orderData = req.body;
  const participants = orderData.participants || [];

  // --- 2. KHAI BÁO CÁC WEBHOOK ---
  
  // Link 1: Webhook CŨ (Báo cáo Admin) - Giữ nguyên
  const ZOHO_ADMIN_URL = 'https://flow.zoho.com/813301204/flow/webhook/incoming?zapikey=1001.33699b799b8a093aa0b15c063af753dd.d24c93d18cd16cccfe0f4f60a217f96d&isdebug=false';
  
  // Link 2: Webhook MỚI (Xử lý Participant/Apollo) - Link bạn đã cung cấp
  const ZOHO_PARTICIPANT_URL = 'https://flow.zoho.com/813301204/flow/webhook/incoming?zapikey=1001.8163fa52665237b419766ca404df383f.8970f705219ee2a8ab6a2045a3a831c7&isdebug=false';

  try {
    // --- BƯỚC A: Gửi báo cáo tổng quan cho Admin (Flow Cũ) ---
    const adminPromise = fetch(ZOHO_ADMIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    // --- BƯỚC B: Gửi tín hiệu xử lý từng Participant (Flow Mới) ---
    const participantPromises = participants.map(async (person) => {
      // Tìm cấu hình dựa trên tên sản phẩm chính xác
      const config = PRODUCT_CONFIG[person.assessmentName];

      // Nếu không tìm thấy cấu hình, log cảnh báo và bỏ qua
      if (!config) {
        console.warn(`[WARNING] Không tìm thấy cấu hình cho sản phẩm: "${person.assessmentName}"`);
        return null; 
      }

      // Chuẩn bị gói tin gửi sang Zoho Flow Mới
      const payload = {
        participant_name: person.name,
        participant_email: person.email,
        product_name: person.assessmentName,
        
        // Gửi type để Zoho phân loại
        type: config.type, 
        // Gửi link (đã cấu hình ở trên)
        link: config.link, 
        
        // Thông tin tham chiếu
        order_ref: orderData.order_id_ref || `ORD-${Date.now()}`
      };

      // Gửi sang Webhook Mới
      return fetch(ZOHO_PARTICIPANT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    });

    // Chờ tất cả gửi đi
    await Promise.all([adminPromise, ...participantPromises]);

    return res.status(200).json({ message: 'Processed successfully' });

  } catch (error) {
    console.error('Server Logic Error:', error);
    return res.status(200).json({ warning: 'Partial success', error: error.message });
  }
}