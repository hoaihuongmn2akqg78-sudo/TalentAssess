// File: api/trigger-paid.js

const PRODUCT_CONFIG = {
  'Everything DiSC Workplace® Profile': {
    type: 'disc_workplace',
    link: 'https://www.everythingdisc.com/',
  },
  'APOLLO Profile': {
    type: 'apollo', 
    link: 'https://www.apollonean.com.au/apollo/servlet/abtwsac/apollo/ApolloEntryForm', 
  },
  'MBTI® Step I - Profile Report': {
    type: 'mbti_step1_profile',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=3291889b-a3e0-f011-8d4d-000d3a5d14c2', 
  },
  'MBTI® Step I - Interpretive Report for Organizations': {
    type: 'mbti_step1_iro',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=59e5cfe1-a3e0-f011-8d4d-000d3a5d14c2', 
  },
  'MBTI® Step II - Interpretive Report': {
    type: 'mbti_step2_interpretive',
    link: 'https://online.cpp.com/en/index.aspx?R=STEP2_INTERPRETIVE_TEST',
  },
  'iStartStrong': {
    type: 'istartstrong',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=7793da18-60e1-f011-8d4d-000d3a5d14c2',
  },
  'TKI Profile and Interpretive Report': {
    type: 'tki_profile',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=c4d6d2b5-64e1-f011-8d4d-000d3a5d14c2', 
  },
  'Work Engagement Profile Interpretive Report': {
    type: 'work_engagement',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=60ec724b-65e1-f011-8d4d-000d3a5d14c2',
  },
  'MBTI® Step I™ - Interpretive Report': {
    type: 'mbti_step1_interpretive',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=3f453449-a2e0-f011-8d4d-000d3a5d14c2',
  },
  'MBTI® Step I™ - Career Report': {
    type: 'mbti_step1_career',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=59a3f272-aae0-f011-8d4d-000d3a5d14c2',
  },
  'MBTI® Step I™ - Conflict Style Report': {
    type: 'mbti_step1_conflict',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=e2c5e162-ace0-f011-8d4d-000d3a5d14c2',
  },
  'MBTI® Step I™ - Communication Style Report': {
    type: 'mbti_step1_communication',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=15be56b4-41e1-f011-8d4d-000d3a5d14c2',
  },
  'MBTI® Step I™ - Decision-Making Style Report': {
    type: 'mbti_step1_decision',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=9c9741ea-47e1-f011-8d4d-000d3a5d14c2',
  },
  'MBTI® Step I™ - Stress Management Report': {
    type: 'mbti_step1_stress',
    link: 'https://Elevate.themyersbriggs.com/Respondent/ReturningUser?tokenId=d4b1c7dc-48e1-f011-8d4d-000d3a5d14c2',
  },
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

  const { record, old_record } = req.body;
  const ZOHO_PARTICIPANT_URL = 'https://flow.zoho.com/813301204/flow/webhook/incoming?zapikey=1001.8163fa52665237b419766ca404df383f.8970f705219ee2a8ab6a2045a3a831c7&isdebug=false';

  try {
    // 1. Kiểm tra điều kiện status chuyển sang PAID
    if (record.status === 'paid' && old_record.status !== 'paid') {
      
      console.log('Status changed to PAID. Processing...');

      let participants = record.participants;

      if (typeof participants === 'string') {
        try {
          participants = JSON.parse(participants);
        } catch (e) {
          console.error('Lỗi parse JSON participants:', e);
          participants = [];
        }
      }

      if (!Array.isArray(participants)) {
         participants = [];
      }

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