import { Assessment, BlogPost } from './types';

const GUIDANCE_NOTE = " Note: If you are not the assessment taker, please enter the taker’s information in the checkout field.";

const GUIDANCE_MBTI = "After payment is completed, the user will immediately receive a credential link to begin the questionnaire. Once the survey is completed, the report will be released within 2 working days." + GUIDANCE_NOTE;
const GUIDANCE_APOLLO = "After payment is completed, the user will receive an Apollo access link with a username and password within 2 working days. The report will be released once the assessment is completed." + GUIDANCE_NOTE;
const GUIDANCE_OTHER = "After payment is completed, the user will receive the assessment link within 2 working days. The report will be released immediately upon completing the survey." + GUIDANCE_NOTE;

// Placeholder sample report link
const SAMPLE_URL = "https://www.lhh.com/en-sg/our-knowledge/sample-reports/";

// Helper FAQ sets
const FAQ_MBTI = [
  { question: "Are there right or wrong answers?", answer: "No. The MBTI assessment describes your personality preferences. There are no right or wrong answers, and one type is not better than another." },
  { question: "Can I use this for hiring?", answer: "The MBTI instrument is ethically restricted from being used for hiring or selection. It is strictly for development, self-awareness, and team building." },
  { question: "How long is the report valid?", answer: "Personality preferences tend to be stable over time. However, we recommend re-taking the assessment if you undergo significant life changes or haven't taken it in 3+ years." }
];

const FAQ_HOGAN = [
  { question: "Is this assessment suitable for hiring?", answer: "Yes, Hogan assessments are scientifically validated to predict workplace performance and are widely used for high-stakes selection and promotion decisions." },
  { question: "What if I get interrupted while taking it?", answer: "The system saves your progress automatically. You can log back in and resume exactly where you left off." },
  { question: "Do I need to prepare or study?", answer: "No. These are personality assessments, not knowledge tests. The best approach is to be honest and spontaneous with your answers to get the most accurate results." }
];

const FAQ_APTITUDE = [
  { question: "Is this test timed?", answer: "Yes, this is a strictly timed assessment designed to measure your cognitive processing speed and accuracy under pressure." },
  { question: "Can I use a calculator?", answer: "For numerical reasoning sections, a calculator is typically permitted. Specific instructions will be provided on the welcome screen of the assessment." },
  { question: "What happens if my internet disconnects?", answer: "The system is designed to handle interruptions. If you lose connection, close the browser and click the link again to resume once your connection is stable." }
];

const FAQ_ISTARTSTRONG = [
  { question: "What is iStartStrong?", answer: "iStartStrong is a personalized career report based on the Strong Interest Inventory. It helps you identify your interests and matches them with potential career paths and educational opportunities." },
  { question: "Who is it for?", answer: "It is ideal for high school and college students, as well as adults looking to pivot careers or find more fulfillment in their current field." },
  { question: "How long does it take?", answer: "The assessment typically takes about 15-20 minutes to complete." }
];

const FAQ_TKI = [
  { question: "What are the five conflict modes?", answer: "The TKI measures five modes: Competing, Collaborating, Compromising, Avoiding, and Accommodating. Each mode is a combination of assertiveness and cooperativeness." },
  { question: "Is one mode better than the others?", answer: "No. The most effective mode depends on the situation and the individuals involved. The TKI helps you expand your toolkit so you can choose the best approach for any given conflict." }
];

const FAQ_WEP = [
  { question: "What is work engagement?", answer: "Work engagement is a positive, fulfilling, work-related state of mind. It's about being passionate, energetic, and committed to your role." },
  { question: "How can this profile help me?", answer: "By identifying which intrinsic rewards (Meaningfulness, Choice, Competence, Progress) are low, you can work with your manager to redesign aspects of your role to increase your energy and satisfaction." }
];

export const ASSESSMENTS: Assessment[] = [
  // --- MBTI ---
  {
    id: 'mbti-step1-profile',
    name: 'MBTI® Step I - Profile Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 95.00,
    description: 'The standard MBTI assessment providing your 4-letter personality type. Ideal for self-awareness and initial team building.',
    whatItMeasures: '4 dichotomies: Extraversion-Introversion, Sensing-Intuition, Thinking-Feeling, Judging-Perceiving.',
    features: ['Personalized 4-letter type', 'Clarity of preferences', 'Brief development tips'],
    benefits: ['Increase self-awareness', 'Improve communication', 'Resolve conflict'],
    bestFor: 'Individual development, Team building',
    image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/bb80ce40520733b2004075216a303e14d378f9c19ec423b408a07972566c68bd"
  },
  {
    id: 'mbti-step1-iro',
    name: 'MBTI® Step I - Interpretive Report for Organizations',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 125.00,
    description: 'A detailed report designed specifically for organizational settings, applying type to work styles and communication.',
    whatItMeasures: 'MBTI Step I Type with workplace application.',
    features: ['Work style analysis', 'Communication style', 'Problem-solving approach'],
    benefits: ['Better workplace integration', 'Enhanced management', 'Career development'],
    bestFor: 'Employees, Managers',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_MBTI,
    faq: [
      ...FAQ_MBTI,
      { question: "How is this different from the Profile Report?", answer: "The IRO is much more detailed (approx. 10 pages vs 2 pages) and specifically focuses on how your personality plays out in a work environment, including leadership and conflict styles." }
    ],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/b5925c588d1a734ef27809c97997ee4189306ed59c0ef04342501d8244ad4b37"
  },
  {
    id: 'mbti-step1-interpretive',
    name: 'MBTI® Step I™ - Interpretive Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 108.00,
    description: 'A comprehensive report that explains your MBTI results in depth, providing insights into how your type impacts your personal and professional life.',
    whatItMeasures: 'Basic MBTI type with extended interpretive narrative.',
    features: ['Detailed type descriptions', 'Growth and development suggestions', 'Relational insights'],
    benefits: ['Deep self-understanding', 'Actionable growth paths', 'Better interpersonal dynamics'],
    bestFor: 'Individual development, Personal coaching',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c434c4b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/4187f4c1b777a9afa02ebb07da76674b6cfb70a7e1fe37e7f4216cb047ca9058"
  },
  {
    id: 'mbti-step1-career',
    name: 'MBTI® Step I™ - Career Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 75.00,
    description: 'Applies your personality type to career exploration, helping you find roles and environments where you will thrive.',
    whatItMeasures: 'Personality type in relation to career satisfaction and fit.',
    features: ['Career-type mapping', 'Preferred work environments', 'Potential career challenges'],
    benefits: ['Targeted career search', 'Identify high-satisfaction roles', 'Understand work-style strengths'],
    bestFor: 'Job seekers, Students, Career changers',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/fcbfc22fc5633b31f8c7a51487f775acec80571d4a14df99342b87cc9a50ca33"
  },
  {
    id: 'mbti-step1-conflict',
    name: 'MBTI® Step I™ - Conflict Style Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 105.00,
    description: 'Explores how your personality type influences your reaction to conflict and provides strategies for more effective resolution.',
    whatItMeasures: 'Conflict triggers and behaviors based on MBTI type.',
    features: ['Conflict style analysis', 'Typical blind spots', 'Management strategies'],
    benefits: ['Reduced friction', 'Improved problem solving', 'Better team synergy'],
    bestFor: 'Team leaders, Employee development',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/fc1e955b193c1222706aabd32995cac582dd895b7de1f16b015a6c5100d3778b"
  },
  {
    id: 'mbti-step1-communication',
    name: 'MBTI® Step I™ - Communication Style Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 105.00,
    description: 'Details your natural communication style and provides tips for adapting to others to improve collaboration.',
    whatItMeasures: 'Verbal and written communication preferences.',
    features: ['Communication habits', 'Influence styles', 'Tips for cross-type communication'],
    benefits: ['Clearer messaging', 'Increased influence', 'Better team alignment'],
    bestFor: 'Professionals at all levels',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/71de3d30c33b766251b5eaa1b4028c2d18a8f3bb30c642d83181fa516203c8cf"
  },
  {
    id: 'mbti-step1-decision',
    name: 'MBTI® Step I™ - Decision-Making Style Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 105.00,
    description: 'Analyzes how you gather information and make choices, identifying potential biases and areas for improvement.',
    whatItMeasures: 'Information gathering and evaluation preferences.',
    features: ['Decision style breakdown', 'Potential pitfalls', 'Improvement roadmap'],
    benefits: ['Better organizational outcomes', 'Reduced bias', 'Faster consensus building'],
    bestFor: 'Managers, Executives',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/4fe5fb78ba388dff29cf11ae5f8100f3ecb473458ce4c15a9d68281e6c4efba5"
  },
  {
    id: 'mbti-step1-stress',
    name: 'MBTI® Step I™ - Stress Management Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 105.00,
    description: 'Identifies stress triggers unique to your personality type and provides customized coping mechanisms.',
    whatItMeasures: 'Stress indicators and responses.',
    features: ['Stress triggers by type', 'Behavioral warning signs', 'Coping strategies'],
    benefits: ['Increased resilience', 'Prevent burnout', 'Better emotional regulation'],
    bestFor: 'High-pressure environments',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/b2227e06d5ae6d0064fcc5ca7bd3dc52e8a583c1fbad088db240e0ce36bc6b5c"
  },
  {
    id: 'mbti-step1-healthcare',
    name: 'MBTI® Step I™ - Healthcare Professionals Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 100.00,
    description: 'Designed specifically for the healthcare sector, focusing on patient interaction, teamwork, and care delivery.',
    whatItMeasures: 'Personality type applied to medical and clinical settings.',
    features: ['Patient communication tips', 'Clinical team dynamics', 'Self-care for caregivers'],
    benefits: ['Better patient outcomes', 'Reduced clinician burnout', 'Enhanced care coordination'],
    bestFor: 'Doctors, Nurses, Allied Health',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Sector-specific self-report',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team', 'Organization'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/bb5e3b25d9460e296dae330045e8d72e17f949bc12eee84272f098b1a61f8a97"
  },
  {
    id: 'mbti-step2-interpretive',
    name: 'MBTI® Step II - Interpretive Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 160.00,
    description: 'The most comprehensive MBTI report available, combining Step I and Step II data with extensive development planning.',
    whatItMeasures: 'Full Type + 20 Facets with detailed interpretation.',
    features: ['Comprehensive analysis', 'Communication exercises', 'Decision-making style', 'Change management style'],
    benefits: ['Executive level insight', 'Comprehensive development roadmap'],
    bestFor: 'Executives, Senior Leaders',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '45 mins',
    methodology: 'Extended questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/0a6a46e26542dc6f6c6cdd54ea8185a128250f71ab13e8bff2d5f0ac7547e1e3"
  },

  // --- APOLLO ---
  {
    id: 'apollo',
    name: 'APOLLO Profile',
    provider: 'Apollo',
    category: 'Personality',
    price: 135.00,
    description: 'A multi-faceted personality tool designed for selection and development.',
    whatItMeasures: '34 factors including work preferences and values.',
    features: ['Job match reporting', 'Development tips', 'Narrative report'],
    benefits: ['Cost-effective selection', 'Identify training needs'],
    bestFor: 'Recruitment, General employees',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '40 mins',
    methodology: 'Normative questionnaire',
    useCase: ['Hiring', 'Selection'],
    level: ['Individual'],
    guidance: GUIDANCE_APOLLO,
    faq: [
      { question: "Is Apollo suitable for all job levels?", answer: "Yes, Apollo compares candidates against different norm groups (e.g., Managers, Sales, Grads) to ensure relevance across all organizational levels." },
      { question: "Does it detect faking?", answer: "Yes, Apollo has built-in social desirability scales to identify if a candidate is trying to present an over-positive image." }
    ],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/de054c6aeba0148688b8692e740e5108df64e768b69ac0205b35a9915adf65f8"
  },

  // --- ISTARTSTRONG ---
  {
    id: 'istartstrong',
    name: 'iStartStrong',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 40.00,
    description: 'A dynamic career interest report that provides a starting point for career exploration. It maps your interests to career paths and educational fields.',
    whatItMeasures: 'Career interests based on Holland Codes (RIASEC themes) and specific interest areas.',
    features: [
      'Personalized interest profile',
      'Top career recommendations',
      'Educational and major suggestions',
      'Direct links to career data'
    ],
    benefits: [
      'Find clarity in career direction',
      'Discover educational paths that match your passions',
      'Validate your career choices with scientific data',
      'Start your professional journey with confidence'
    ],
    bestFor: 'Students, Career Changers, Career Counseling',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '15-20 mins',
    methodology: 'Strong Interest Inventory based questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_ISTARTSTRONG,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/0bde01cc0584f68656d9d48882c74102c1d47c6ff1de3e6ac38be00f28e0b167"
  },

  // --- TKI ---
  {
    id: 'tki-profile-interpretive',
    name: 'TKI Profile and Interpretive Report',
    provider: 'The Myers-Briggs Company',
    category: 'Team Effectiveness',
    price: 90.00,
    description: 'The world\'s best-selling conflict management tool. It identifies an individual\'s preferred conflict-handling style and provides guidance for more effective resolution.',
    whatItMeasures: 'Five conflict-handling modes: Competing, Collaborating, Compromising, Avoiding, and Accommodating.',
    features: [
      'Personal conflict style profile',
      'Interpretive guidance for each mode',
      'Situational appropriateness analysis',
      'Conflict resolution strategies'
    ],
    benefits: [
      'Improve team communication',
      'Reduce workplace friction',
      'Navigate difficult conversations effectively',
      'Increase personal and team productivity'
    ],
    bestFor: 'Conflict Management, Team Building, Management Development',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '15-20 mins',
    methodology: 'Self-report forced-choice questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_TKI,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/ff5217c6155864cc055e37ded7d955e12608baa6c0fb83fafd71fdd6fc9a65a2"
  },

  // --- WORK ENGAGEMENT PROFILE ---
  {
    id: 'work-engagement-profile-interpretive',
    name: 'Work Engagement Profile Interpretive Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 85.00,
    description: 'Measures the intrinsic rewards that drive employee engagement. This report helps individuals and managers understand how to boost energy, passion, and commitment at work.',
    whatItMeasures: 'Four intrinsic rewards: Meaningfulness, Choice, Competence, and Progress.',
    features: [
      'Intrinsic reward scoring',
      'Current engagement level analysis',
      'Personalized development tips',
      'Engagement improvement roadmap'
    ],
    benefits: [
      'Increase employee retention',
      'Identify and address burnout risk',
      'Empower individuals to manage their own engagement',
      'Drive high-performance culture'
    ],
    bestFor: 'Employee Retention, Engagement Surveys, Career Development',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '10-15 mins',
    methodology: 'Self-report engagement assessment',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_WEP,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/c68c3cd19af1a6f863ec6bae70d1b8975d0b65760ffb9eec838eb604e979a0f3"
  },

  // --- HOGAN CORE ---
  {
    id: 'hogan-flash',
    name: 'Hogan Flash Report',
    provider: 'Hogan Assessments',
    category: 'Leadership',
    price: 180.00,
    description: 'A snapshot of HPI, HDS, and MVPI scores without interpretive text. For certified users.',
    whatItMeasures: 'All scales from HPI, HDS, MVPI.',
    features: ['Graphical data only', 'No narrative', 'Quick reference'],
    benefits: ['Cost-effective for coaches', 'Immediate data access'],
    bestFor: 'Certified Coaches, HR Pros',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '60 mins',
    methodology: 'HPI + HDS + MVPI',
    useCase: ['Coaching', 'Selection'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: [
        ...FAQ_HOGAN,
        { question: "Why is there no text?", answer: "The Flash report is designed for certified practitioners who can interpret the raw scale scores without needing generic narrative descriptions." }
    ],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/6191208aa4352ca23b2560d96fb87eb7e2526def59b17f9baae0725a37ed03bf"
  },
  {
    id: 'hogan-eq',
    name: 'Hogan EQ Report',
    provider: 'Hogan Assessments',
    category: 'Personality',
    price: 150.00,
    description: 'Assess emotional intelligence based on personality, not just current skill.',
    whatItMeasures: '6 EQ Competencies: Awareness, Detection, Regulation, Influence, Expression, Empathy.',
    features: ['EQ Score', 'Pros/Cons of score', 'Discussion points'],
    benefits: ['Improve interpersonal skill', 'Sales effectiveness'],
    bestFor: 'Sales, Customer Service, Leaders',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI + HDS',
    useCase: ['Development', 'Hiring'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/2632729437993b53b3dc604a7ddb7f1366445fbfaef98ddb38e18cd393762050"
  },
  {
    id: 'hogan-leader-focus',
    name: 'Hogan Leader Focus Report',
    provider: 'Hogan Assessments',
    category: 'Leadership',
    price: 150.00,
    description: 'Includes HPI and MVPI. Focuses on leadership style and values.',
    whatItMeasures: 'Leadership style based on day-to-day personality and drivers.',
    features: ['6 Leadership Dimensions', 'Blind spots'],
    benefits: ['Emerging leader development', 'Self-insight'],
    bestFor: 'New Managers',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '40 mins',
    methodology: 'HPI + MVPI',
    useCase: ['Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/1088c3cb777900c6f9da5abbb7ab3e24201b96eb0b1027c58b65abefc6e86856"
  },
  {
    id: 'hogan-career',
    name: 'Hogan Career Report',
    provider: 'Hogan Assessments',
    category: 'Personality',
    price: 100.00,
    description: 'Provides insights into how an individual’s personality will impact their career success and workplace performance.',
    whatItMeasures: 'Professional strengths, potential derailers, and career drivers.',
    features: ['HPI Scale interpretation', 'Career development tips', 'Job fit indicators'],
    benefits: ['Better career alignment', 'Personalized growth plan', 'Identify key strengths'],
    bestFor: 'Job seekers, Early career professionals',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI based report',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/a1078325e0d09ca9a45fc14c5a756a16594db4bb5ca9f6a71aa83012a83e6dcd"
  },
  {
    id: 'hogan-challenge',
    name: 'Hogan Challenge Report',
    provider: 'Hogan Assessments',
    category: 'Leadership',
    price: 240.00,
    description: 'Explores the "dark side" of personality—tendencies that emerge under stress and can derail leadership effectiveness.',
    whatItMeasures: '11 personality derailers including Arrogance, Volatility, and Caution.',
    features: ['Dark side behavioral profile', 'Risk mitigation strategies', 'Strategic self-awareness'],
    benefits: ['Prevent leadership failure', 'Improve team relations', 'Manage stress reactions'],
    bestFor: 'Senior Leaders, High-potentials',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HDS based report',
    useCase: ['Development', 'Selection'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/d426b867f2015c65688a122825d7b6b9607cbf3eb3606dc135264e855c90ddd0"
  },
  {
    id: 'hogan-coaching',
    name: 'Hogan Coaching Report',
    provider: 'Hogan Assessments',
    category: 'Leadership',
    price: 240.00,
    description: 'A comprehensive development tool that integrates HPI, HDS, and MVPI results into an actionable executive coaching roadmap.',
    whatItMeasures: 'Bright side traits, dark side derailers, and core values.',
    features: ['Integrated 3-assessment view', 'Coaching focus areas', 'Developmental action items'],
    benefits: ['Targeted executive growth', 'Strategic talent development', 'High-impact self-insight'],
    bestFor: 'Executives, Senior Management',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '60 mins',
    methodology: 'Integrated HPI/HDS/MVPI',
    useCase: ['Coaching', 'Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/14ea35ec51a8b83fe1db0d50373e6a71b9e4515fee057646a7f6865e1db23edd"
  },
  {
    id: 'hogan-compass',
    name: 'Hogan Compass Report',
    provider: 'Hogan Assessments',
    category: 'Personality',
    price: 100.00,
    description: 'Unpacks an individual’s values, drivers, and interests to determine organizational fit and career direction.',
    whatItMeasures: '10 Core values including Power, Security, and Hedonism.',
    features: ['Value-based career mapping', 'Preferred work environments', 'Motivational profile'],
    benefits: ['Improve employee engagement', 'Ensure culture fit', 'Identify intrinsic motivators'],
    bestFor: 'Recruitment, Career pathing',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'MVPI based report',
    useCase: ['Selection', 'Development'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/6a8d7b8648c740a3382ac19362476e3b8d4976ca485aedb97cfad9cfe7f24dbe"
  },
  {
    id: 'hogan-manage',
    name: 'Hogan Manage Report',
    provider: 'Hogan Assessments',
    category: 'Leadership',
    price: 100.00,
    description: 'Focuses on the day-to-day managerial style of an individual and how they are likely to lead their teams.',
    whatItMeasures: 'Managerial strengths, development needs, and leadership impact.',
    features: ['Leadership style analysis', 'Employee engagement tips', 'Managing style profile'],
    benefits: ['Upskill new managers', 'Optimize team management', 'Increase leadership awareness'],
    bestFor: 'Middle Management, Emerging Leaders',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI based management view',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/5cb35833af1daa9f99f6cafb9e3a81332e9eec9657f8ffe223510c9fa9d3d796"
  },
  {
    id: 'hogan-safety',
    name: 'Hogan Safety Development Report',
    provider: 'Hogan Assessments',
    category: 'Sales & Safety',
    price: 100.00,
    description: 'Measures individual safety awareness and identifies potential safety risks in industrial and high-risk roles.',
    whatItMeasures: '6 Safety-related traits: Defiant, Panicky, Irritable, Distractible, Reckless, Arrogant.',
    features: ['Safety risk profile', 'Behavioral coaching for safety', 'Risk reduction tips'],
    benefits: ['Reduce workplace accidents', 'Improve safety culture', 'Screen for safety-conscious talent'],
    bestFor: 'Industrial roles, Transport, Healthcare',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI safety-mapped scales',
    useCase: ['Hiring', 'Selection'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/c4b8a83fd49252cb32cd555961f6de14321baa7619193a5c285d8d565f668139"
  },
  {
    id: 'hogan-sales',
    name: 'Hogan Sales Basis Report',
    provider: 'Hogan Assessments',
    category: 'Sales & Safety',
    price: 210.00,
    description: 'Evaluates personality in relation to sales performance, focusing on strengths and hurdles in the sales cycle.',
    whatItMeasures: 'Sales potential, networking ability, and resilience to rejection.',
    features: ['8 Sales competencies', 'Sales style breakdown', 'Coaching for sales performance'],
    benefits: ['Hire top sales talent', 'Improve sales productivity', 'Targeted sales training'],
    bestFor: 'Sales professionals, Account managers',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI/MVPI sales mapping',
    useCase: ['Hiring', 'Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/6c32b5f38b926e3e75d0d2278952dfbbf87e5b83ea187091fa7ee6c8f7046769"
  },
  {
    id: 'lhh-unconscious-bias',
    name: 'LHH Mitigating Unconscious Bias Report',
    provider: 'LHH',
    category: 'Leadership',
    price: 110.00,
    description: 'Helps leaders identify their blind spots and provides strategies to foster a more inclusive and equitable workplace culture.',
    whatItMeasures: 'Inclusion tendencies, bias awareness, and behavioral openness.',
    features: ['Bias awareness profile', 'Actionable inclusion strategies', 'Impact on decision making'],
    benefits: ['Drive DE&I initiatives', 'Improve leadership fairness', 'Reduce organizational bias'],
    bestFor: 'Managers, HR Leaders',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Custom behavioral assessment',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_OTHER,
    faq: [
      { question: "What is the goal of this report?", answer: "The goal is to provide leaders with an objective view of their natural biases and offer concrete behavioral changes to support a diverse workforce." }
    ],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/59cdc45301548caa6a5d8cd2f8537404c01bd6a8ee9d07caf74b0f062f446b97"
  },

  // --- SAVILLE ---
  {
    id: 'saville-abs-reasoning',
    name: 'Saville Abstract Reasoning Aptitude',
    provider: 'Saville Assessment',
    category: 'Aptitude',
    price: 60.00,
    description: 'Measures the ability to think clearly and solve problems with novel information.',
    whatItMeasures: 'Fluid intelligence, pattern recognition.',
    features: ['Single assessment', 'Timed'],
    benefits: ['Predicts strategic thinking', 'Fair across cultures'],
    bestFor: 'Graduates, Technical roles',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '16 mins',
    methodology: 'Timed aptitude test',
    useCase: ['Hiring'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_APTITUDE,
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'saville-swift-analysis',
    name: 'Saville Swift Analysis Aptitude',
    provider: 'Saville Assessment',
    category: 'Aptitude',
    price: 100.00,
    description: 'Combined Verbal, Numerical, and Diagrammatic aptitude battery.',
    whatItMeasures: 'Verbal, Numerical, and Diagrammatic reasoning.',
    features: ['3-in-1 test', 'Short duration', 'High validity'],
    benefits: ['Efficient screening', 'Comprehensive cognitive view'],
    bestFor: 'Management, Graduates',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '24 mins',
    methodology: 'Timed aptitude battery',
    useCase: ['Hiring', 'Selection'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_APTITUDE,
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'saville-wave-expert',
    name: 'Saville Wave Focus Styles Expert Report',
    provider: 'Saville Assessment',
    category: 'Personality',
    price: 160.00,
    description: 'Includes complimentary Personal & Line Manager reports. Deep dive into work style.',
    whatItMeasures: 'Behavioral style and competencies.',
    features: ['Expert interpretation', 'Competency potential'],
    benefits: ['Deep behavioral insight', 'Recruitment & Development'],
    bestFor: 'Selection, Coaching',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '13 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Hiring', 'Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: [
      { question: "Is this report good for hiring?", answer: "Yes, the Expert Report gives a prediction of 'Competency Potential' and 'Culture Fit', making it ideal for selection decisions." },
      { question: "How does Wave differ from MBTI?", answer: "Wave is trait-based and predicts performance, whereas MBTI is type-based and describes preferences. Wave is generally preferred for recruitment." }
    ],
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'saville-wave-leadership-impact',
    name: 'Saville Leadership Impact Expert Report',
    provider: 'Saville Assessment',
    category: 'Leadership',
    price: 220.00,
    description: 'Focuses on the impact a leader has on their organization and people.',
    whatItMeasures: 'Leadership risk and impact areas.',
    features: ['Impact prediction', 'Risk analysis'],
    benefits: ['Mitigate leadership risk', 'Enhance organizational impact'],
    bestFor: 'Senior Leaders',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c434c4b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '40 mins',
    methodology: 'Self-report (Wave)',
    useCase: ['Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: [
      { question: "Do I need to manage people to take this?", answer: "While designed for leaders, high-potential individual contributors can also benefit from understanding their potential leadership impact." }
    ],
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'saville-swift-exec',
    name: 'Saville Swift Executive Aptitude',
    provider: 'Saville Assessment',
    category: 'Aptitude',
    price: 100.00,
    description: 'High-level aptitude test for executive roles.',
    whatItMeasures: 'Verbal, Numerical, Abstract reasoning at executive level.',
    features: ['High difficulty ceiling', 'Executive norms'],
    benefits: ['Screen top-tier talent', 'Ensure cognitive capability'],
    bestFor: 'C-Suite, Directors',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '18 mins',
    methodology: 'Timed aptitude',
    useCase: ['Hiring', 'Selection'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_APTITUDE,
    sampleReportUrl: SAMPLE_URL
  },

  // --- TALENTLENS ---
  {
    id: 'watson-glaser',
    name: 'Watson-Glaser™ w/Profile & Development',
    provider: 'TalentLens',
    category: 'Cognitive Ability',
    price: 135.00,
    description: 'The premier critical thinking assessment.',
    whatItMeasures: 'Critical thinking: Assumptions, Arguments, Deductions, Inferences, Interpretations.',
    features: ['Profile report', 'Development report'],
    benefits: ['Predicts judgment', 'Reduces decision bias'],
    bestFor: 'Lawyers, Leaders, Analysts',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Timed critical thinking test',
    useCase: ['Hiring', 'Selection'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_APTITUDE,
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'ravens-matrices',
    name: 'Ravens Advanced Progressive Matrices',
    provider: 'TalentLens',
    category: 'Aptitude',
    price: 85.00,
    description: 'Non-verbal assessment of general mental ability.',
    whatItMeasures: 'Observation skills, clear thinking ability.',
    features: ['Culture fair', 'Language neutral'],
    benefits: ['Global applicability', 'Measure raw potential'],
    bestFor: 'Global roles, Technical roles',
    image: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '40 mins',
    methodology: 'Non-verbal matrix puzzles',
    useCase: ['Hiring', 'Selection'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: [
      ...FAQ_APTITUDE,
      { question: "Is this suitable for non-English speakers?", answer: "Yes, the Raven's Matrices are entirely non-verbal and require no reading ability, making it ideal for international candidates." }
    ],
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'talentlens-ndit',
    name: 'Numerical Data Interpretation Test (NDIT)',
    provider: 'TalentLens',
    category: 'Aptitude',
    price: 85.00,
    description: 'Assesses ability to interpret and manipulate numerical data.',
    whatItMeasures: 'Numerical reasoning relevant to business.',
    features: ['Business scenarios', 'Data interpretation'],
    benefits: ['Identify financial acumen', 'Screen analysts'],
    bestFor: 'Finance, Analysts',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Timed test',
    useCase: ['Hiring'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_APTITUDE,
    sampleReportUrl: SAMPLE_URL
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Why EQ Matters More Than IQ for Leadership Success',
    excerpt: 'Discover how emotional intelligence predicts leadership performance and drives team engagement better than cognitive ability alone.',
    category: 'Leadership',
    date: 'Oct 12, 2024',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Sarah Chen',
    readTime: '6 min read',
    content: `
      <p>In the high-stakes world of corporate leadership, cognitive intelligence (IQ) has long been the gold standard for recruitment. It predicts how quickly a leader can learn, analyze complex data, and strategize. However, as the business landscape becomes increasingly volatile and interconnected, a new metric has emerged as the true differentiator of exceptional leadership: Emotional Intelligence (EQ).</p>
      
      <h3>The Limitations of Pure Intellect</h3>
      <p>While IQ helps a leader determine <em>what</em> needs to be done, EQ dictates <em>how</em> it gets done through people. A leader with high IQ but low EQ may devise a brilliant strategy but fail to inspire the team to execute it. They might struggle to manage their own stress during a crisis, leading to erratic decision-making, or fail to read the subtle cues of team burnout.</p>
      
      <h3>The Four Pillars of EQ in Leadership</h3>
      <ul>
        <li><strong>Self-Awareness:</strong> The ability to recognize one's own emotions and their impact on others. Self-aware leaders understand their triggers and limitations, making them more resilient.</li>
        <li><strong>Self-Regulation:</strong> Controlling disruptive impulses. Leaders who self-regulate foster trust and fairness, creating an environment where employees feel safe to innovate.</li>
        <li><strong>Social Awareness (Empathy):</strong> Understanding the emotional makeup of other people. This is crucial for retaining top talent and navigating cross-cultural teams.</li>
        <li><strong>Relationship Management:</strong> Building networks and managing conflict. This is where influence happens—not through authority, but through connection.</li>
      </ul>
      
      <h3>Data-Backed Evidence</h3>
      <p>Research from the Center for Creative Leadership found that the primary causes of executive derailment involve deficits in emotional competence—specifically, difficulty in handling change, not being able to work well in a team, and poor interpersonal relations. Conversely, EQ has been shown to account for nearly 90% of the difference between outstanding and average leaders in senior roles.</p>
      
      <h3>Conclusion</h3>
      <p>To build a future-proof organization, companies must look beyond the resume. Incorporating EQ assessments like the Hogan EQ Report or Saville Wave into the selection process isn't just a "soft skill" preference—it's a hard business necessity.</p>
    `
  },
  {
    id: '3',
    title: 'The Hidden Cost of Bad Hires (and How to Avoid Them)',
    excerpt: 'A bad hire can cost up to 30% of the employee’s first-year earnings. Learn how objective data mitigates bias in recruitment.',
    category: 'Hiring',
    date: 'Sep 15, 2024',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Jennifer Wu, SHRM-SCP',
    readTime: '7 min read',
    content: `
      <p>We've all been there: The candidate interviewed perfectly. They were charming, confident, and had a stellar resume. Three months later, they are toxic to the team culture, missing deadlines, and you are back to square one. The U.S. Department of Labor estimates the cost of a bad hire at 30% of the employee's first-year earnings, but for leadership roles, the cost to morale and productivity can be unquantifiable.</p>
      
      <h3>The "Halo Effect" in Interviewing</h3>
      <p>Traditional interviews are notoriously unreliable. Hiring managers often fall victim to the "Halo Effect," where one positive trait (like confidence or a shared alma mater) overshadows red flags. Conversely, unconscious bias can weed out diverse candidates who don't fit the "traditional" mold but have high potential.</p>
      
      <h3>Enter Objective Assessment Data</h3>
      <p>Valid psychometric assessments act as an insurance policy against bias. They measure two critical things that interviews miss:</p>
      <ul>
        <li><strong>Cognitive Ability:</strong> Can they do the job? Tools like the Raven's Matrices or Watson-Glaser measure raw processing power and critical thinking, which correlates strongly with job performance in complex roles.</li>
        <li><strong>Personality Fit:</strong> Will they do the job <em>here</em>? A candidate might be a high performer, but if they value autonomy and your culture is highly collaborative, they will fail. Tools like the OPQ32 or Hogan Personality Inventory predict this fit gap.</li>
      </ul>
      
      <h3>Case Study: Tech Sales Team</h3>
      <p>A global SaaS company was struggling with high turnover in their sales team. They introduced the Saville Swift Analysis Aptitude test and a sales-specific personality profile. The result? They identified that "Resilience" and "Numerical Reasoning" were better predictors of success than "Extraversion." Turnover dropped by 40% in year one.</p>
      
      <h3>The ROI of Science</h3>
      <p>Adding a $100 assessment to your hiring stack is a small price to pay to avoid a $50,000 mistake. It provides a common language for hiring committees and ensures that you are hiring for potential, not just polish.</p>
    `
  },
  {
    id: '4',
    title: 'Understanding the "Dark Side" of Personality',
    excerpt: 'Hogan HDS explains why some leaders derail under stress. We unpack the risk factors that can sabotage a promising career.',
    category: 'Personality',
    date: 'Aug 30, 2024',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Robert Hogan (Adapted)',
    readTime: '8 min read',
    content: `
      <p>Most performance reviews focus on the "Bright Side" of personality—how we behave when we are at our best. We are charming, detail-oriented, or ambitious. But what happens when the pressure mounts? When we are tired, stressed, or complacent? The "Dark Side" emerges.</p>
      
      <h3>The derailers</h3>
      <p>The Hogan Development Survey (HDS) identifies 11 specific "derailers"—behaviors that can wreck a career. Interestingly, these traits often start as strengths:</p>
      <ul>
        <li><strong>Excitable:</strong> Starts as passion and intensity. Under stress, it becomes volatility and moodiness. The team walks on eggshells.</li>
        <li><strong>Cautious:</strong> Starts as careful risk management. Under stress, it becomes paralysis and fear of making mistakes. Innovation dies.</li>
        <li><strong>Bold:</strong> Starts as confidence and charisma. Under stress, it becomes arrogance and a refusal to listen to feedback.</li>
      </ul>
      
      <h3>Why You Can't Interview for This</h3>
      <p>Dark side traits are insidious because they coexist with high social skills. A "Bold" leader often interviews exceptionally well. They sound visionary. It takes 3-6 months for the arrogance to alienate the team. Assessments allow you to peek behind the curtain before you make the hire.</p>
      
      <h3>Mitigation, Not Elimination</h3>
      <p>Having a high score on a Dark Side scale doesn't doom a leader. In fact, many CEOs have high scores on "Bold" or "Imaginative." The key is <strong>awareness</strong>. Once a leader knows their derailers, they can build coping mechanisms. They can hire a deputy who is "Prudent" to check their "Imaginative" impulses. They can learn to pause before sending that angry email.</p>
      
      <h3>Strategic Self-Awareness</h3>
      <p>The goal of the HDS is strategic self-awareness. It turns the unconscious reaction into a conscious choice, allowing leaders to maintain their effectiveness even in the stormiest of business climates.</p>
    `
  }
];