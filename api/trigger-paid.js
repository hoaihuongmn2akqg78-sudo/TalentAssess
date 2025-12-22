// File: api/trigger-paid.js

// 1. CẤU HÌNH SẢN PHẨM (Y HỆT FILE CŨ)
const PRODUCT_CONFIG = {
  'APOLLO Profile': {
    type: 'apollo', 
    link: 'https://www.apollonean.com.au/apollo/servlet/abtwsac/apollo/ApolloEntryForm', 
  },
  'MBTI® Step I - Profile Report': {
    type: 'mbti_step1_profile',
    link: 'https://online.cpp.com/en/index.aspx?R=MBTI_STEP1_PROFILE_TEST', 
  },
  'MBTI® Step I - Interpretive Report for Organizations': {
    type: 'mbti_step1_iro',
    link: 'https://online.cpp.com/en/index.aspx?R=MBTI_IRO_TEST', 
  },
  'MBTI® Step II - Profile Report': {
    type: 'mbti_step2_profile',
    link: 'https://online.cpp.com/en/index.aspx?R=STEP2_PROFILE_TEST',
  },
  'MBTI® Step II - Interpretive Report': {
    type: 'mbti_step2_interpretive',
    link: 'https://online.cpp.com/en/index.aspx?R=STEP2_INTERPRETIVE_TEST',
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Dữ liệu Supabase gửi sang có dạng { type: 'UPDATE', record: {...}, old_record: {...} }
  const { record, old_record } = req.body;

  // Link Webhook Zoho (Flow Participant)
  const ZOHO_PARTICIPANT_URL = 'https://flow.zoho.com/813301204/flow/webhook/incoming?zapikey=1001.8163fa52665237b419766ca404df383f.8970f705219ee2a8ab6a2045a3a831c7&isdebug=false';

  try {
    // KIỂM TRA ĐIỀU KIỆN QUAN TRỌNG:
    // 1. Chỉ chạy khi trạng thái MỚI là 'paid'
    // 2. VÀ trạng thái CŨ KHÁC 'paid' (tránh gửi trùng khi update cái khác)
    if (record.status === 'paid' && old_record.status !== 'paid') {
      
      const participants = record.participants || [];
      
      const promises = participants.map(async (person) => {
        const config = PRODUCT_CONFIG[person.assessmentName];
        if (!config) return null;

        const payload = {
          participant_name: person.name,
          participant_email: person.email,
          product_name: person.assessmentName,
          type: config.type,
          link: config.link,
          order_ref: record.order_id_ref || `ORD-${Date.now()}` // Lưu ý: Supabase trả về record nên lấy record.order_id_ref
        };

        return fetch(ZOHO_PARTICIPANT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      });

      await Promise.all(promises);
      return res.status(200).json({ message: 'Triggered Paid Sequence Successfully' });
    } 
    
    // Nếu không phải chuyển sang Paid thì bỏ qua
    return res.status(200).json({ message: 'Ignored: Status not changed to PAID' });

  } catch (error) {
    console.error('Trigger Error:', error);
    return res.status(500).json({ error: error.message });
  }
}