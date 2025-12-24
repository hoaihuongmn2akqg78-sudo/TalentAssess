// File: api/notify-zoho.js

// --- 1. CẤU HÌNH SẢN PHẨM ---
const PRODUCT_CONFIG = {
  // 1. APOLLO Profile
  'APOLLO Profile': {
    type: 'apollo', 
    link: 'https://www.apollonean.com.au/apollo/servlet/abtwsac/apollo/ApolloEntryForm', 
  },

  // 2. MBTI® Step I - Profile Report
  'MBTI® Step I - Profile Report': {
    type: 'mbti_step1_profile',
    link: 'https://online.cpp.com/en/index.aspx?R=MBTI_STEP1_PROFILE_TEST', 
  },

  // 3. MBTI® Step I - Interpretive Report for Organizations
  'MBTI® Step I - Interpretive Report for Organizations': {
    type: 'mbti_step1_iro',
    link: 'https://online.cpp.com/en/index.aspx?R=MBTI_IRO_TEST', 
  },

  // 4. MBTI® Step II - Profile Report
  'MBTI® Step II - Profile Report': {
    type: 'mbti_step2_profile',
    link: 'https://online.cpp.com/en/index.aspx?R=STEP2_PROFILE_TEST',
  },

  // 5. MBTI® Step II - Interpretive Report
  'MBTI® Step II - Interpretive Report': {
    type: 'mbti_step2_interpretive',
    link: 'https://online.cpp.com/en/index.aspx?R=STEP2_INTERPRETIVE_TEST',
  },

  // 6. FIRO-B® Profile Report
  'FIRO-B® Profile Report': {
    type: 'firo_b_profile',
    link: 'https://online.cpp.com/en/index.aspx?R=FIRO_B_PROFILE_TEST',
  },

  // 7. FIRO-B® Interpretive Report for Organizations
  'FIRO-B® Interpretive Report for Organizations': {
    type: 'firo_b_iro',
    link: 'https://online.cpp.com/en/index.aspx?R=FIRO_B_IRO_TEST',
  },

  // 8. FIRO-Business® Profile
  'FIRO-Business® Profile': {
    type: 'firo_business',
    link: 'https://online.cpp.com/en/index.aspx?R=FIRO_BUSINESS_PROFILE_TEST',
  },

  // 9. FIRO-Business® Leadership Report
  'FIRO-Business® Leadership Report': {
    type: 'firo_business_leadership',
    link: 'https://online.cpp.com/en/index.aspx?R=FIRO_BUSINESS_LEADERSHIP_TEST',
  },

  // 10. iStartStrong
  'iStartStrong': {
    type: 'istartstrong',
    link: 'https://online.cpp.com/en/index.aspx?R=ISTARTSTRONG_TEST',
  },

  // 11. Strong Interest Inventory® Profile Report
  'Strong Interest Inventory® Profile Report': {
    type: 'strong_profile',
    link: 'https://online.cpp.com/en/index.aspx?R=STRONG_PROFILE_TEST',
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const orderData = req.body;
  const participants = orderData.participants || [];
  
  // Lấy trạng thái đơn hàng (Mặc định là pending nếu thiếu)
  const currentStatus = orderData.status || 'pending';

  // --- 2. KHAI BÁO CÁC WEBHOOK ---
  const ZOHO_ADMIN_URL = 'https://flow.zoho.com/813301204/flow/webhook/incoming?zapikey=1001.33699b799b8a093aa0b15c063af753dd.d24c93d18cd16cccfe0f4f60a217f96d&isdebug=false';
  const ZOHO_PARTICIPANT_URL = 'https://flow.zoho.com/813301204/flow/webhook/incoming?zapikey=1001.8163fa52665237b419766ca404df383f.8970f705219ee2a8ab6a2045a3a831c7&isdebug=false';

  try {
    const promises = [];

    // --- BƯỚC A: Luôn gửi báo cáo cho Admin (Bất kể thanh toán hay chưa) ---
    promises.push(
      fetch(ZOHO_ADMIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })
    );

    // --- BƯỚC B: Gửi cho Participant (CHỈ KHI ĐÃ THANH TOÁN) ---
    // [QUAN TRỌNG] Kiểm tra điều kiện status === 'paid'
    if (currentStatus === 'paid') {
      console.log('--> Đơn đã thanh toán. Tiến hành gửi mail cho Participant.');
      
      participants.forEach((person) => {
        const config = PRODUCT_CONFIG[person.assessmentName];
        if (!config) return; // Bỏ qua nếu không tìm thấy config

        const payload = {
          participant_name: person.name,
          participant_email: person.email,
          product_name: person.assessmentName,
          type: config.type, 
          link: config.link, 
          order_ref: orderData.order_id_ref || `ORD-${Date.now()}`
        };

        promises.push(
          fetch(ZOHO_PARTICIPANT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
        );
      });
    } else {
      console.log('--> Đơn chưa thanh toán (Pending). Bỏ qua gửi mail Participant.');
    }

    // Chờ tất cả lệnh gửi đi
    await Promise.all(promises);

    return res.status(200).json({ message: 'Processed successfully', status: currentStatus });

  } catch (error) {
    console.error('Server Logic Error:', error);
    return res.status(200).json({ warning: 'Partial success', error: error.message });
  }
}