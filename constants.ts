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

const FAQ_FIRO = [
  { question: "What does FIRO stand for?", answer: "FIRO stands for Fundamental Interpersonal Relations Orientation. It measures your interpersonal needs and how they influence your communication style." },
  { question: "How is FIRO-Business different from the MBTI?", answer: "While MBTI focuses on how you perceive information and make decisions, FIRO-Business focuses specifically on how you interact with others and your needs for inclusion, control, and affection in a workplace context." },
  { question: "Is this assessment good for teams?", answer: "Yes, it is one of the most powerful tools for team building, as it reveals the underlying 'interpersonal gaps' that often cause friction and misunderstanding in groups." }
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

const FAQ_360 = [
  { question: "Are my raters anonymous?", answer: "Yes. Ratings are aggregated by group (e.g., Peers, Direct Reports) to protect anonymity, with the exception of the Manager category." },
  { question: "How many raters should I invite?", answer: "We recommend inviting 6-10 raters across different categories to ensure a representative and reliable view of your performance." },
  { question: "How long does the process take?", answer: "While the survey takes 20 minutes, the full 360 process usually spans 2-3 weeks to allow all raters enough time to provide thoughtful feedback." }
];

const FAQ_ISTARTSTRONG = [
  { question: "What is iStartStrong?", answer: "iStartStrong is a personalized career report based on the Strong Interest Inventory. It helps you identify your interests and matches them with potential career paths and educational opportunities." },
  { question: "Who is it for?", answer: "It is ideal for high school and college students, as well as adults looking to pivot careers or find more fulfillment in their current field." },
  { question: "How long does it take?", answer: "The assessment typically takes about 15-20 minutes to complete." }
];

const FAQ_STRONG = [
  { question: "How accurate is the Strong Interest Inventory?", answer: "The Strong Interest Inventory is one of the most widely used and respected career planning tools in the world, with over 80 years of research backing its validity." },
  { question: "Does it tell me what I should be when I grow up?", answer: "It provides a clear picture of your interests and suggests careers that people with similar interests find satisfying. It is a guide for exploration, not a definitive command." }
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
    sampleReportUrl: SAMPLE_URL
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
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'mbti-step2-profile',
    name: 'MBTI® Step II - Profile Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 110.00,
    description: 'Delves deeper into the 20 facets of the MBTI preferences for a granular view of personality.',
    whatItMeasures: '20 Facets (5 per preference pair).',
    features: ['Facet-level scoring', 'Personalized graphic layout', 'Nuanced type description'],
    benefits: ['Explain unique individual differences', 'Deepen coaching conversations'],
    bestFor: 'Coaching, Leadership',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '45 mins',
    methodology: 'Extended questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: [
      ...FAQ_MBTI,
      { question: "Do I need to take Step I first?", answer: "No, the Step II questionnaire covers both Step I and Step II items in a single sitting." },
      { question: "Why take Step II?", answer: "Step II explains why two people with the same 4-letter type can behave very differently. It reveals the unique 'fingerprint' of your personality." }
    ],
    sampleReportUrl: SAMPLE_URL
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
    sampleReportUrl: SAMPLE_URL
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
      { question: "Does it detect faking?", answer: "Yes, Apollo has built-in social desirability scales to identify if a candidate is trying to present an overly positive image." }
    ],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/de054c6aeba0148688b8692e740e5108df64e768b69ac0205b35a9915adf65f8"
  },

  // --- MYERS-BRIGGS FIRO ---
  {
    id: 'firo-b-profile',
    name: 'FIRO-B® Profile Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 85.00,
    description: 'The classic FIRO-B assessment providing deep insights into how your interpersonal needs influence your communication and relationships.',
    whatItMeasures: 'The three interpersonal needs (Inclusion, Control, Affection) across two dimensions: Expressed and Wanted behaviors.',
    features: [
      'Total Need score overview',
      'Need for Inclusion, Control, and Affection',
      'Expressed vs. Wanted behavior scores',
      'Interaction pattern analysis'
    ],
    benefits: [
      'Understand your social and relational needs',
      'Improve interpersonal communication',
      'Build stronger, more collaborative relationships',
      'Identify potential blind spots in social interactions'
    ],
    bestFor: 'Individual Coaching, Relationship Building, Self-Awareness',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '15-20 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_FIRO,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/8524af5bc08af61eb20acd2e8ac785d76539b79adb72b298f09e2370c32a8f32"
  },
  {
    id: 'firo-b-iro',
    name: 'FIRO-B® Interpretive Report for Organizations',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 120.00,
    description: 'A comprehensive report that applies the FIRO-B framework to the workplace, focusing on how interpersonal needs impact professional relationships, leadership style, and organizational culture.',
    whatItMeasures: 'Interpersonal needs in a workplace context: Inclusion, Control, and Affection across Expressed and Wanted behaviors.',
    features: [
      'Detailed organizational application',
      'Team dynamic analysis',
      'Leadership behavior insights',
      'Relationship development strategies'
    ],
    benefits: [
      'Enhance organizational communication',
      'Identify and resolve team friction points',
      'Develop more effective management styles',
      'Improve culture through behavioral awareness'
    ],
    bestFor: 'Managers, Teams, Organizational Development',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '20 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team', 'Organization'],
    guidance: GUIDANCE_MBTI,
    faq: [
      ...FAQ_FIRO,
      { question: "How does this differ from the basic Profile Report?", answer: "While the Profile Report gives you your scores, the Interpretive Report for Organizations explains exactly how those scores manifest in professional environments and team settings." }
    ],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/45a20c40df0e4a005580f1c0b6ccecb9d6f448dbab774ea288a131880633b773"
  },
  {
    id: 'firo-business-profile',
    name: 'FIRO-Business® Profile',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 95.00,
    description: 'Measures interpersonal needs in the workplace, helping individuals understand how their needs for inclusion, control, and affection influence their work style.',
    whatItMeasures: '3 areas of interpersonal need: Inclusion, Control, and Affection (both Expressed and Wanted behaviors).',
    features: [
      'Interpersonal needs analysis',
      'Communication style breakdown',
      'Team compatibility insights',
      'Actionable development advice'
    ],
    benefits: [
      'Improve team performance and synergy',
      'Resolve interpersonal conflict effectively',
      'Increase self-awareness of social behavior',
      'Enhance leadership influence and impact'
    ],
    bestFor: 'Team Building, Conflict Management, Leadership Development',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '15-20 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_FIRO,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/8a4771523474442ff7ae28bebbf96ce37038712b7a3c6e8946cb78aeb090af2d"
  },
  {
    id: 'firo-business-leadership',
    name: 'FIRO-Business® Leadership Report',
    provider: 'The Myers-Briggs Company',
    category: 'Leadership',
    price: 115.00,
    description: 'Designed specifically for leaders, this report provides actionable insights into a leader’s interpersonal needs and their impact on leadership style and performance.',
    whatItMeasures: 'Leadership interpersonal needs: Inclusion, Control, and Affection within a high-stakes management context.',
    features: [
      'Leadership behavioral summary',
      'Influence and delegation styles',
      'Communication and feedback strategies',
      'Conflict management in leadership'
    ],
    benefits: [
      'Enhance leadership self-awareness',
      'Identify potential leadership interpersonal gaps',
      'Improve executive presence and team influence',
      'Provide targeted executive coaching roadmaps'
    ],
    bestFor: 'Executive Leaders, Senior Managers, Leadership Coaching',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '20 mins',
    methodology: 'Self-report questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_FIRO,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/ec76cc2c9f916f8da7136b22c418865c5a5d79806439f6b2b8f4cd8c197e832f"
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

  // --- STRONG INTEREST INVENTORY ---
  {
    id: 'strong-interest-inventory-profile',
    name: 'Strong Interest Inventory® Profile Report',
    provider: 'The Myers-Briggs Company',
    category: 'Personality',
    price: 55.00,
    description: 'A comprehensive report that measures your interests in a wide range of occupations, work activities, leisure activities, and school subjects to help guide your career path.',
    whatItMeasures: 'General Occupational Themes (RIASEC), Basic Interest Scales, Occupational Scales, and Personal Style Scales.',
    features: [
      'Detailed RIASEC interest code',
      'Top 10 occupational matches',
      'Extensive work style analysis',
      'Leisure and education recommendations'
    ],
    benefits: [
      'Gain deep insight into professional motivators',
      'Broaden career exploration options',
      'Align education and training with interests',
      'Increase career satisfaction through alignment'
    ],
    bestFor: 'Career Exploration, Adult Career Transition, Students',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '25-30 mins',
    methodology: 'Normative interest inventory',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_STRONG,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/81fcc9cdda36723ba792dc59aaded493338954533761af43cc6ce1ed1abe3c77"
  },

  // --- LHH / OTHER ---
  {
    id: 'lhh-resilience',
    name: 'LHH Accelerate Change - Your Resilience Profile',
    provider: 'LHH / Hogan',
    category: 'Leadership',
    price: 60.00,
    description: 'Includes standard HPI and HDS with the Your Resilience Report.',
    whatItMeasures: 'Personality traits related to handling stress and change.',
    features: ['HPI & HDS insights', 'Resilience score', 'Coping strategies'],
    benefits: ['Build personal resilience', 'Navigate organizational change'],
    bestFor: 'Employees undergoing change',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI + HDS',
    useCase: ['Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'lhh-change-behavior',
    name: 'LHH Change Behavior Assessment',
    provider: 'LHH / Hogan',
    category: 'Leadership',
    price: 60.00,
    description: 'Includes standard HPI and HDS with the Change Behavior Assessment Report.',
    whatItMeasures: 'Behavioral tendencies during change initiatives.',
    features: ['Change readiness', 'Resistance factors'],
    benefits: ['Accelerate adoption', 'Reduce friction'],
    bestFor: 'Change agents, Managers',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI + HDS',
    useCase: ['Development'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'lhh-leadership-contract',
    name: 'LHH The Leadership Contract Report',
    provider: 'LHH / Hogan',
    category: 'Leadership',
    price: 220.00,
    description: 'Includes standard HPI, HDS, and MVPI with TLC Report.',
    whatItMeasures: 'Full personality profile against leadership accountabilities.',
    features: ['Comprehensive 3-assessment view', 'Accountability index'],
    benefits: ['Deepen leadership commitment', 'Align values with action'],
    bestFor: 'Senior Leaders',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '60 mins',
    methodology: 'HPI + HDS + MVPI',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'lhh-women-leadership',
    name: 'LHH Elevating Women in Leadership Report',
    provider: 'LHH / Hogan',
    category: 'Leadership',
    price: 220.00,
    description: 'Includes standard HPI and MVPI with the EWIL Report.',
    whatItMeasures: 'Key strengths and values for women in leadership.',
    features: ['Gender-neutral benchmarking', 'Strengths focus', 'Values alignment'],
    benefits: ['Empower female leaders', 'Address specific career hurdles'],
    bestFor: 'High-potential women',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '45 mins',
    methodology: 'HPI + MVPI',
    useCase: ['Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: SAMPLE_URL
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
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'hogan-high-potential',
    name: 'Hogan High Potential Talent Report',
    provider: 'Hogan Assessments',
    category: 'Leadership',
    price: 390.00,
    description: 'The gold standard for identifying and developing future leaders. Identifies strengths, derailers, and drivers.',
    whatItMeasures: 'Leadership potential across Bright Side, Dark Side, and Inside.',
    features: ['Executive summary', 'Career development tips', 'Prioritized action plan'],
    benefits: ['Identify top talent', 'Reduce promotion risk'],
    bestFor: 'HiPo Programs, Succession',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '60 mins',
    methodology: 'HPI + HDS + MVPI',
    useCase: ['Development', 'Selection'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'hogan-insight-series',
    name: 'Hogan Insight Series',
    provider: 'Hogan Assessments',
    category: 'Leadership',
    price: 230.00,
    description: 'Includes HPI, HDS, and MVPI reports with the Insight Series narratives.',
    whatItMeasures: 'Self-awareness across three domains.',
    features: ['Insight HPI', 'Insight HDS', 'Insight MVPI'],
    benefits: ['Comprehensive self-awareness', 'Middle management development'],
    bestFor: 'Middle Managers',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '60 mins',
    methodology: 'HPI + HDS + MVPI',
    useCase: ['Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN,
    sampleReportUrl: SAMPLE_URL
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
    sampleReportUrl: SAMPLE_URL
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
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'hogan-team-report',
    name: 'Hogan Team Report (30 person max)',
    provider: 'Hogan Assessments',
    category: 'Team Effectiveness',
    price: 1800.00,
    description: 'Analyzes team composition, roles, and potential fracture lines.',
    whatItMeasures: 'Team aggregate scores on HPI, HDS, MVPI.',
    features: ['Team Roles', 'Derailment risks', 'Team culture values'],
    benefits: ['Optimize team performance', 'Understand group dynamics'],
    bestFor: 'Executive Teams, Project Teams',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: 'N/A (Aggregated)',
    methodology: 'HPI + HDS + MVPI (Aggregated)',
    useCase: ['Development'],
    level: ['Team'],
    guidance: GUIDANCE_OTHER,
    faq: [
      { question: "Do all team members need to take the assessments?", answer: "Yes, for the most accurate team profile, we recommend 100% participation. The price covers aggregation for up to 30 people." },
      { question: "Is individual data kept confidential?", answer: "Yes, the team report only shows aggregated data and roles. It does not reveal individual scores to the group." }
    ],
    sampleReportUrl: SAMPLE_URL
  },

  // --- PROFILOR ---
  {
    id: 'profilor-standard',
    name: 'PROFILOR® Standard',
    provider: 'Korn Ferry',
    category: '360 Feedback',
    price: 220.00,
    description: 'Standard PROFILOR content with Individual PDF Report.',
    whatItMeasures: 'Competencies observed by others.',
    features: ['Feedback summary', 'Gap analysis', 'Normative comparison'],
    benefits: ['Validates self-perception', 'Identifies blind spots'],
    bestFor: 'Leaders, Managers',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: 'Varies',
    methodology: 'Multi-rater survey',
    useCase: ['Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_360,
    sampleReportUrl: SAMPLE_URL
  },
  {
    id: 'profilor-progress',
    name: 'PROFILOR® Time 1 + Progress Report',
    provider: 'Korn Ferry',
    category: '360 Feedback',
    price: 280.00,
    description: 'Standard report plus a progress check to measure development over time.',
    whatItMeasures: 'Change in competency ratings over time.',
    features: ['T1 & T2 comparison', 'Progress chart'],
    benefits: ['Measure ROI of coaching', 'Track improvement'],
    bestFor: 'Long-term development programs',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: 'Varies',
    methodology: 'Multi-rater survey',
    useCase: ['Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_360,
    sampleReportUrl: SAMPLE_URL
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
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
  },

  // --- TALENTx7 ---
  {
    id: 'talentx7-indiv',
    name: 'TALENTx7 Assessment w/ Individual Report',
    provider: 'Talentx7',
    category: 'Learning Agility',
    price: 250.00,
    description: 'Measures Learning Agility - the ability to learn from experience and apply it to new situations.',
    whatItMeasures: '7 facets of Learning Agility.',
    features: ['Individual Report', 'Coach Report'],
    benefits: ['Predicts potential', 'Identify future leaders'],
    bestFor: 'High Potentials',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Self-report',
    useCase: ['Development', 'Selection'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: [
      { question: "What is Learning Agility?", answer: "Learning Agility is the willingness and ability to learn from experience and apply that learning to new and first-time situations. It is the #1 predictor of executive success." },
      { question: "How does this differ from IQ?", answer: "IQ measures your ability to solve known problems. Learning Agility measures your ability to solve unknown problems where you have no prior experience." }
    ],
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
    id: '2',
    title: 'Top 5 Assessments for Remote Team Cohesion',
    excerpt: 'Building culture remotely is hard. Here are the scientifically validated tools that help distributed teams connect and collaborate.',
    category: 'Team Effectiveness',
    date: 'Sep 28, 2024',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Marcus Johnson',
    readTime: '5 min read',
    content: `
      <p>The shift to hybrid and remote work has permanently altered team dynamics. "Water cooler moments" are gone, replaced by scheduled Zoom calls. In this environment, trust doesn't happen organically; it must be engineered. Psychometric assessments provide the blueprint for this engineering.</p>
      
      <h3>1. MBTI® Step II</h3>
      <p>While Step I gives the broad strokes, Step II breaks down the nuances of communication. For a remote team, understanding that a colleague isn't "ignoring" you but simply prefers "Written" over "Verbal" communication (a Facet of Extraversion/Introversion) can prevent months of misunderstanding.</p>
      
      <h3>2. Hogan Team Report</h3>
      <p>This tool aggregates individual personality data to reveal the team's collective "persona." It highlights potential fracture lines—for example, if a team is composed entirely of high-ambition, low-prudence individuals, they may take reckless risks without a remote manager there to provide guardrails.</p>
      
      <h3>3. CliftonStrengths 34</h3>
      <p>Focusing on strengths brings positive energy to virtual meetings. Knowing that a team member leads with "Restorative" means you can tag them when a remote project goes off the rails. It changes the narrative from "fixing weaknesses" to "deploying talent.</p>
      
      <h3>4. FIRO-B</h3>
      <p>Fundamental Interpersonal Relations Orientation-Behavior (FIRO-B) measures the need for inclusion, control, and affection. In remote settings, individuals with a high need for inclusion may suffer silently. This tool helps managers identify who needs more frequent check-ins versus who prefers autonomy.</p>
      
      <h3>5. Thomas-Kilmann Conflict Mode Instrument (TKI)</h3>
      <p>Conflict in remote teams is often invisible until it explodes. TKI helps teams agree on a "vocabulary" for conflict, making it safe to disagree on Slack or Teams without escalating into a flame war.</p>
      
      <h3>Implementing the Tools</h3>
      <p>Don't just email the PDF reports. Host a virtual workshop where team members share their "User Manuals." The goal is to replace assumptions with data, creating a high-trust culture regardless of time zone.</p>
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
  },
  {
    id: '5',
    title: 'Learning Agility: The X-Factor of High Potentials',
    excerpt: 'In a rapidly changing world, the ability to learn and apply new skills is the #1 predictor of executive success. What is your LQ?',
    category: 'Talent Management',
    date: 'Aug 14, 2024',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Elena Rostova',
    readTime: '5 min read',
    content: `
      <p>The shelf life of a technical skill is now less than 5 years. In this environment, hiring for current competency is a losing strategy. Companies must hire for <em>Learning Agility</em>: the willingness and ability to learn from experience and apply that learning to new and first-time situations.</p>
      
      <h3>Defining Learning Agility</h3>
      <p>Korn Ferry and Columbia University have identified it as the primary predictor of executive success. It is composed of five facets:</p>
      <ol>
        <li><strong>Mental Agility:</strong> Comfort with complexity and ambiguity. These people find patterns in disparate data.</li>
        <li><strong>People Agility:</strong> Knowing yourself and being able to work with diverse groups.</li>
        <li><strong>Change Agility:</strong> Like to experiment and comfortable with change.</li>
        <li><strong>Results Agility:</strong> Delivering results in first-time situations.</li>
        <li><strong>Self-Awareness:</strong> Knowing one's strengths and weaknesses.</li>
      </ol>
      
      <h3>The High Potential Trap</h3>
      <p>Many organizations confuse "High Performance" with "High Potential." A high performer is great at their <em>current</em> job. A high potential has the agility to scale into a <em>future</em> job that might not even exist yet. Assessments like the TALENTx7 explicitly measure this agility.</p>
      
      <h3>Cultivating Agility</h3>
      <p>Can it be taught? Yes, but it requires a growth mindset. Leaders must be placed in "stretch assignments"—roles that are slightly beyond their current capability—and given the coaching support to reflect on their failures. Without reflection, there is no learning, only experience.</p>
    `
  },
  {
    id: '6',
    title: 'Creating a Data-Driven Succession Plan',
    excerpt: 'Stop guessing who is ready for the C-Suite. Use objective assessment data to build a robust pipeline of future-ready leaders.',
    category: 'Succession Planning',
    date: 'Jul 22, 2024',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c434c4b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'David Thorne',
    readTime: '6 min read',
    content: `
      <p>Succession planning is often an exercise in politics. Names are put in a 9-box grid based on who the current CEO likes, rather than who has the capability to lead the company forward. This subjective approach leads to the "Peter Principle," where people are promoted to their level of incompetence.</p>
      
      <h3>The 9-Box Grid 2.0</h3>
      <p>To modernize succession, we must overlay the subjective manager review with objective data. Imagine a 9-box grid where the X-axis (Performance) is determined by KPIs, but the Y-axis (Potential) is determined by a validated assessment of Leadership Potential (like the Hogan High Potential Report).</p>
      
      <h3>Identifying "Hidden Gems"</h3>
      <p>Objective data often reveals "Hidden Gems"—employees who are quiet, perhaps introverted, or from underrepresented groups, who don't self-promote but have immense strategic capacity. Without assessments, these individuals are often overlooked in favor of the loudest voice in the room.</p>
      
      <h3>Readiness vs. Potential</h3>
      <p>Assessments also help distinguish between readiness (can do it now) and potential (can do it later). A "High Potential" leader might need a 2-year rotation in Finance to be "Ready." Data helps HR craft these personalized development plans.</p>
      
      <h3>Risk Mitigation</h3>
      <p>Finally, data-driven succession creates a defendable audit trail. When the board asks why Candidate A was chosen over Candidate B, you have a dossier of objective evidence regarding their judgment, emotional intelligence, and strategic thinking, rather than just "a gut feeling."</p>
    `
  }
];