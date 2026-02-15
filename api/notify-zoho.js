// File: api/notify-zoho.js

// --- 1. CẤU HÌNH SẢN PHẨM ---
const PRODUCT_CONFIG = {
  // 0. Everything DiSC
  'Everything DiSC Workplace® Profile': {
    type: 'disc_workplace',
    link: 'https://www.everythingdisc.com/',
  },

  // 1. APOLLO Profile
  'APOLLO Profile': {
    type: 'apollo', 
    link: 'https://www.apollonean.com.au/apollo/servlet/abtwsac/apollo/ApolloEntryForm', 
  },

  // 2. MBTI® Step I - Profile Report
  'MBTI® Step I - Profile Report': {
    type: 'mbti_step1_profile',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=3291889b-a3e0-f011-8d4d-000d3a5d14c2', 
  },

  // 3. MBTI® Step I - Interpretive Report for Organizations
  'MBTI® Step I - Interpretive Report for Organizations': {
    type: 'mbti_step1_iro',
    link: 'https://Elevate.themygs.com/Respondent/ReturningUser?tokenId=59e5cfe1-a3e0-f011-8d4d-000d3a5d14c2', 
  },

  // 4. MBTI® Step II - Interpretive Report
  'MBTI® Step II - Interpretive Report': {
    type: 'mbti_step2_interpretive',
    link: 'https://online.cpp.com/en/index.aspx?R=STEP2_INTERPRETIVE_TEST',
  },

  // 5. iStartStrong
  'iStartStrong': {
    type: 'istartstrong',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=7793da18-60e1-f011-8d4d-000d3a5d14c2',
  },

  // 6. TKI Profile and Interpretive Report
  'TKI Profile and Interpretive Report': {
    type: 'tki_profile',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=c4d6d2b5-64e1-f011-8d4d-000d3a5d14c2',
  },

  // 7. Work Engagement Profile Interpretive Report
  'Work Engagement Profile Interpretive Report': {
    type: 'work_engagement',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=60ec724b-65e1-f011-8d4d-000d3a5d14c2',
  },

  // 8. MBTI® Step I™ - Interpretive Report
  'MBTI® Step I™ - Interpretive Report': {
    type: 'mbti_step1_interpretive',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=3f453449-a2e0-f011-8d4d-000d3a5d14c2',
  },

  // 9. MBTI® Step I™ - Career Report
  'MBTI® Step I™ - Career Report': {
    type: 'mbti_step1_career',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=59a3f272-aae0-f011-8d4d-000d3a5d14c2',
  },

  // 10. MBTI® Step I™ - Conflict Style Report
  'MBTI® Step I™ - Conflict Style Report': {
    type: 'mbti_step1_conflict',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=e2c5e162-ace0-f011-8d4d-000d3a5d14c2',
  },

  // 11. MBTI® Step I™ - Communication Style Report
  'MBTI® Step I™ - Communication Style Report': {
    type: 'mbti_step1_communication',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=15be56b4-41e1-f011-8d4d-000d3a5d14c2',
  },

  // 12. MBTI® Step I™ - Decision-Making Style Report
  'MBTI® Step I™ - Decision-Making Style Report': {
    type: 'mbti_step1_decision',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=9c9741ea-47e1-f011-8d4d-000d3a5d14c2',
  },

  // 13. MBTI® Step I™ - Stress Management Report
  'MBTI® Step I™ - Stress Management Report': {
    type: 'mbti_step1_stress',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=d4b1c7dc-48e1-f011-8d4d-000d3a5d14c2',
  },

  // 14. MBTI® Step I™ - Healthcare Professionals Report
  'MBTI® Step I™ - Healthcare Professionals Report': {
    type: 'mbti_step1_healthcare',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=35227ea9-5ee1-f011-8d4d-000d3a5d14c2',
  },

  // --- HOGAN REPORTS ---
  'Hogan Flash Report': {
    type: 'hogan_flash',
    link: 'https://www.hoganassessments.com/'
  },
  'Hogan EQ Report': {
    type: 'hogan_eq',
    link: 'https://www.hoganassessments.com/'
  },
  'Hogan Leader Focus Report': {
    type: 'hogan_leader_focus',
    link: 'https://www.hoganassessments.com/'
  },
  'Hogan Career Report': {
    type: 'hogan_career',
    link: 'https://www.hoganassessments.com/'
  },
  'Hogan Challenge Report': {
    type: 'hogan_challenge',
    link: 'https://www.hoganassessments.com/'
  },
  'Hogan Coaching Report': {
    type: 'hogan_coaching',
    link: 'https://www.hoganassessments.com/'
  },
  'Hogan Compass Report': {
    type: 'hogan_compass',
    link: 'https://www.hoganassessments.com/'
  },
  'Hogan Manage Report': {
    type: 'hogan_manage',
    link: 'https://www.hoganassessments.com/'
  },
  'Hogan Safety Development Report': {
    type: 'hogan_safety',
    link: 'https://www.hoganassessments.com/'
  },
  'Hogan Sales Basis Report': {
    type: 'hogan_sales',
    link: 'https://www.hoganassessments.com/'
  },

  // --- LHH REPORTS ---
  'LHH Mitigating Unconscious Bias Report': {
    type: 'lhh_unconscious_bias',
    link: 'https://www.lhh.com/'
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
    if (currentStatus === 'paid') {
      console.log('--> Đơn đã thanh toán. Tiến hành gửi mail cho Participant.');
      
      participants.forEach((person) => {
        const config = PRODUCT_CONFIG[person.assessmentName];
        if (!config) return; 

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

    await Promise.all(promises);
    return res.status(200).json({ message: 'Processed successfully', status: currentStatus });

  } catch (error) {
    console.error('Server Logic Error:', error);
    return res.status(200).json({ warning: 'Partial success', error: error.message });
  }
}