// File: api/trigger-paid.js

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
  'FIRO-B® Profile Report': {
    type: 'firo_b_profile',
    link: 'https://online.cpp.com/en/index.aspx?R=FIRO_B_PROFILE_TEST',
  },
  'FIRO-B® Interpretive Report for Organizations': {
    type: 'firo_b_iro',
    link: 'https://online.cpp.com/en/index.aspx?R=FIRO_B_IRO_TEST',
  },
  'FIRO-Business® Profile': {
    type: 'firo_business',
    link: 'https://online.cpp.com/en/index.aspx?R=FIRO_BUSINESS_PROFILE_TEST',
  },
  'FIRO-Business® Leadership Report': {
    type: 'firo_business_leadership',
    link: 'https://online.cpp.com/en/index.aspx?R=FIRO_BUSINESS_LEADERSHIP_TEST',
  },
  'iStartStrong': {
    type: 'istartstrong',
    link: 'https://online.cpp.com/en/index.aspx?R=ISTARTSTRONG_TEST',
  },
  'Strong Interest Inventory® Profile Report': {
    type: 'strong_profile',
    link: 'https://online.cpp.com/en/index.aspx?R=STRONG_PROFILE_TEST',
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { record, old_record } = req.body;
  const ZOHO_PARTICIPANT_URL = 'https://flow.zoho.com/813301204/flow/webhook/incoming?zapikey=1001.8163fa52665237b419766ca404df383f.8970f705219ee2a8ab6a2045a3a831c7&isdebug=false';

  try {
    // 1. Kiểm tra điều kiện status chuyển sang PAID
    if (record.status === 'paid' && old_record.status !== 'paid') {
      
      console.log('Status changed to PAID. Processing...');

      // --- [FIX QUAN TRỌNG] Xử lý lỗi data dạng String ---
      let participants = record.participants;

      // Nếu participants là chuỗi (do sửa tay hoặc lỗi DB), hãy parse nó ra JSON
      if (typeof participants === 'string') {
        try {
          participants = JSON.parse(participants);
        } catch (e) {
          console.error('Lỗi parse JSON participants:', e);
          participants = []; // Nếu lỗi thì trả về rỗng để không crash app
        }
      }

      // Đảm bảo nó là mảng trước khi map
      if (!Array.isArray(participants)) {
         participants = [];
      }
      // ----------------------------------------------------

      const promises = participants.map(async (person) => {
        const config = PRODUCT_CONFIG[person.assessmentName];
        if (!config) {
            console.log('Không tìm thấy config cho:', person.assessmentName);
            return null;
        }

        const payload = {
          participant_name: person.name,
          participant_email: person.email,
          product_name: person.assessmentName,
          type: config.type,
          link: config.link,
          order_ref: record.order_id_ref || `ORD-${Date.now()}`
        };

        // Gửi sang Zoho
        return fetch(ZOHO_PARTICIPANT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      });

      await Promise.all(promises);
      return res.status(200).json({ message: 'Triggered Paid Sequence Successfully' });
    } 
    
    return res.status(200).json({ message: 'Ignored: Status not changed to PAID' });

  } catch (error) {
    console.error('Trigger Error:', error);
    return res.status(500).json({ error: error.message });
  }
}