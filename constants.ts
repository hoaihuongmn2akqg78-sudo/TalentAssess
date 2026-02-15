import { Assessment, BlogPost } from './types';

const GUIDANCE_NOTE = " Note: If you are not the assessment taker, please enter the taker’s information in the checkout field.";
const GUIDANCE_MBTI = "After payment, you will receive a credential link. Upon completion, our experts will review and release your report within 2 working days." + GUIDANCE_NOTE;
const GUIDANCE_OTHER = "Your assessment link will be dispatched within 2 working days. Most reports are generated instantly upon completion." + GUIDANCE_NOTE;

// --- SHARED PERSUASIVE FAQs ---
const FAQ_MBTI_SALES = [
  { question: "Why choose MBTI for my team?", answer: "MBTI is the world's most popular personality framework for a reason: it's non-judgmental. It helps teams build a shared language to value differences rather than fight over them, making it the perfect 'ice-breaker' for long-term culture building." },
  { question: "Is this the 'official' assessment?", answer: "Yes. We provide the genuine MBTI® assessment from The Myers-Briggs Company, backed by 70+ years of research. This is not a 'lookalike' free test found online." },
  { question: "How long until we see results?", answer: "Immediately. The awareness gained during the questionnaire often leads to 'aha' moments, and the professional report provides actionable communication tips you can use the same day." }
];

const FAQ_HOGAN_SALES = [
  { question: "Why is Hogan considered the 'Gold Standard'?", answer: "Hogan doesn't just measure how you see yourself; it predicts how others see you. In leadership, 'reputation is everything,' and Hogan is the only tool designed to predict workplace performance and derailment risks with near-clinical accuracy." },
  { question: "Can we use this for hiring?", answer: "Absolutely. Hogan is specifically validated for selection. It provides a legal and scientific safeguard, ensuring you hire for potential and fit rather than just a good interview performance." }
];

const FAQ_DISC_SALES = [
  { question: "MBTI vs. DiSC: Which one do I need?", answer: "MBTI best for deep self-awareness and understanding 'why' we act. DiSC is highly practical and focuses on 'how' we behave. If you want immediate, tactical improvements in daily communication and sales effectiveness, DiSC is your tool." }
];

export const ASSESSMENTS: Assessment[] = [
  // --- CORE BEHAVIOR & PERSONALITY ---
  {
    id: 'everything-disc-workplace',
    name: 'Everything DiSC Workplace® Profile',
    provider: 'Wiley',
    category: 'Behavior & Personality',
    price: 150.00,
    description: "Transform your workplace culture with the world's most practical behavioral tool. Everything DiSC® is not just a test; it’s a shared language that helps employees at every level connect better, communicate more effectively, and reduce the friction that slows down productivity.",
    bestFor: 'Teams seeking immediate improvements in communication, managers looking to build rapport, and organizations aiming to reduce conflict.',
    whatItMeasures: 'Specific behavioral tendencies across four primary styles: Dominance, Influence, Steadiness, and Conscientiousness.',
    features: ['Personalized 20-page behavioral profile', 'Tactical strategies for interacting with different styles', 'Action-oriented summary for immediate application', 'Access to MyEverytingDiSC.com for ongoing learning'],
    benefits: ['Eliminate communication silos across departments', "Equip employees to handle 'difficult' personalities with ease", 'Build a culture of psychological safety and mutual respect', 'Increase team speed by reducing interpersonal misunderstandings'],
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
    duration: '20 mins',
    methodology: 'Adaptive Testing',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team', 'Organization'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_DISC_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/c550dfca5a88761cc45b0eba1a7bb2b2b24fcef8bb09d1bb162c04a5349dd592"
  },
  {
    id: 'mbti-step1-profile',
    name: 'MBTI® Step I - Profile Report',
    provider: 'The Myers-Briggs Company',
    category: 'Behavior & Personality',
    price: 95.00,
    description: 'Unlock the foundation of your professional identity. This essential profile provides a positive framework for understanding how you perceive the world and make decisions, acting as the bedrock for any coaching or self-awareness journey.',
    bestFor: 'Individual contributors, new hires, and professionals seeking a clear understanding of their natural personality preferences.',
    whatItMeasures: 'Core psychological preferences: Extraversion-Introversion, Sensing-Intuition, Thinking-Feeling, and Judging-Perceiving.',
    features: ['Verified 4-letter personality type', 'Summary of strengths and work-style preferences', 'Concise development pointers'],
    benefits: ['Gain immediate clarity on natural work style', 'Improve communication with diverse personalities', 'Identify optimal environments for high productivity'],
    image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=800&q=80',
    duration: '25 mins',
    methodology: 'Psychometric Questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/bb80ce40520733b2004075216a303e14d378f9c19ec423b408a07972566c68bd"
  },
  {
    id: 'saville-wave-professional',
    name: 'Saville Wave® Professional Styles',
    provider: 'Saville Assessment',
    category: 'Behavior & Personality',
    price: 185.00,
    description: "The premier diagnostic for predicting workplace performance. Saville Wave® Professional Styles provides the most granular view of personality, measuring the dynamic relationship between motives, talents, and workplace culture to pinpoint exactly where an individual will succeed.",
    bestFor: "High-stakes selection, executive talent audits, and deep-dive development planning for senior leaders.",
    whatItMeasures: "36 key behavioral dimensions across four clusters: Thought, Influence, Adaptability, and Delivery.",
    features: ["Hierarchical 36-dimension profile", "Normative and Ipsative scoring for extreme accuracy", "Job-fit and cultural-alignment reporting"],
    benefits: ["Predict job performance with clinical precision", "Identify high-potential talent earlier", "Reduce bias in executive selection and promotion"],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    duration: '35 mins',
    methodology: 'Wave® Dual-Response Psychometrics',
    useCase: ['Selection', 'Hiring', 'Development'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_OTHER,
    faq: [{ question: "Why is Wave better than basic personality tests?", answer: "Wave is the only tool that measures 'Motive' and 'Talent' separately, highlighting where a person has the skill but perhaps not the drive, or vice versa." }],
    sampleReportUrl: "https://www.savilleassessment.com/sample-reports/"
  },
  {
    id: 'mbti-step1-interpretive',
    name: 'MBTI® Step I™ - Interpretive Report',
    provider: 'The Myers-Briggs Company',
    category: 'Behavior & Personality',
    price: 108.00,
    description: 'A deep-dive narrative into your personality type. This comprehensive report explains how your preferences interact and provides an extensive toolkit for personal and professional growth.',
    bestFor: 'Individuals in long-term coaching or those seeking a deep, reflective understanding of their personality architecture.',
    whatItMeasures: 'Detailed facets of your personality type and their everyday application.',
    features: ['Rich narrative descriptions', 'Extensive personal development roadmap', 'Strategies for effective relating'],
    benefits: ['Achieve profound self-understanding', 'Build actionable growth paths', 'Enhance interpersonal maturity'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Psychometric Questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/4187f4c1b777a9afa02ebb07da76674b6cfb70a7e1fe37e7f4216cb047ca9058"
  },
  {
    id: 'mbti-step2-interpretive',
    name: 'MBTI® Step II - Interpretive Report',
    provider: 'The Myers-Briggs Company',
    category: 'Behavior & Personality',
    price: 160.00,
    description: "The most granular MBTI insight available. Beyond your 4-letter type, Step II examines 20 specific facets of personality to explain your unique 'spin' on your type. It is the ultimate tool for executive level coaching.",
    bestFor: 'Senior leaders, executives, and individuals who want to understand the complexities and nuances of their personality facets.',
    whatItMeasures: '20 distinct personality facets alongside the 4-letter type preference.',
    features: ['20 sub-scale facet scores', 'Facet-level development tips', 'Communication and change-style insights'],
    benefits: ['Highly personalized development insights', 'Understand internal behavioral contradictions', 'Optimize leadership and decision-making styles'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    duration: '45 mins',
    methodology: 'Facet-based Psychometric Assessment',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/0a6a46e26542dc6f6c6cdd54ea8185a128250f71ab13e8bff2d5f0ac7547e1e3"
  },
  {
    id: 'apollo',
    name: 'APOLLO Profile',
    provider: 'Apollo',
    category: 'Behavior & Personality',
    price: 135.00,
    description: "A comprehensive workplace behavioral diagnostic. Apollo provides a multi-dimensional view of professional DNA, measuring task approaches, social interaction, and core motivations in one integrated report.",
    bestFor: 'Recruitment screening for mid-level roles and talent benchmarking for cultural alignment.',
    whatItMeasures: '34 work-related factors including task management, social styles, and intrinsic drivers.',
    features: ['34-factor behavioral mapping', 'Job-match reporting', 'Social desirability (faking) detection'],
    benefits: ['Obtain a 360-degree view of candidate fit', 'Identify training needs early in the hire process', 'Reduce turnover by ensuring cultural and values alignment'],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    duration: '40 mins',
    methodology: 'Normative Behavioral Assessment',
    useCase: ['Hiring', 'Selection', 'Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: [{ question: "How does this differ from MBTI?", answer: "While MBTI is for self-discovery, Apollo is a normative diagnostic designed to predict performance and fit against a general population or specific benchmarks." }],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/de054c6aeba0148688b8692e740e5108df64e768b69ac0205b35a9915adf65f8"
  },

  // --- LEADERSHIP & MANAGEMENT ---
  {
    id: 'hogan-leader-focus',
    name: 'Hogan Leader Focus Report',
    provider: 'Hogan Assessments',
    category: 'Leadership & Management',
    price: 150.00,
    description: "Define your leadership signature. By integrating your strengths with your core values, this report explains how you lead others and what kind of culture you build. It's the definitive tool for emerging and established managers.",
    bestFor: 'New managers and high-potential leaders looking to professionalize their management style.',
    whatItMeasures: 'Six leadership dimensions: Results, People, Process, Thought, Social, and Data.',
    features: ['Integrated HPI and MVPI analysis', 'Unique Leadership Signature profile', 'Actionable leadership development tips'],
    benefits: ['Accelerate transition from doer to leader', 'Understand impact on team culture', 'Identify specific gaps in management toolkit'],
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
    duration: '40 mins',
    methodology: 'HPI + MVPI Integration',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/1088c3cb777900c6f9da5abbb7ab3e24201b96eb0b1027c58b65abefc6e86856"
  },
  {
    id: 'hogan-hbri',
    name: 'Hogan Business Reasoning Inventory (HBRI)',
    provider: 'Hogan Assessments',
    category: 'Leadership & Management',
    price: 115.00,
    description: "Evaluate the cognitive capacity of your leaders. The HBRI measures tactical and strategic reasoning—essential for making sound business decisions and solving complex problems in high-velocity environments.",
    bestFor: "Executive selection and leadership development for roles requiring significant analytical and strategic output.",
    whatItMeasures: "Tactical Reasoning (handling daily problems) and Strategic Reasoning (identifying long-term trends and logical errors).",
    features: ["Standardized cognitive benchmarks", "Business-context problem solving", "Critical thinking analysis"],
    benefits: ["Improve executive decision-making quality", "Identify individuals with high strategic learning potential", "Select leaders capable of navigating complex data"],
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Normative Ability Inventory',
    useCase: ['Selection', 'Hiring', 'Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN_SALES,
    sampleReportUrl: "https://www.hoganassessments.com/assessment/hogan-business-reasoning-inventory/"
  },
  {
    id: 'hogan-challenge',
    name: 'Hogan Challenge Report',
    provider: 'Hogan Assessments',
    category: 'Leadership & Management',
    price: 240.00,
    description: "Identify leadership derailers before they happen. This report maps the 'Dark Side' of personality—tendencies that emerge under stress and can sabotage effectiveness and team morale.",
    bestFor: 'Senior executives and leaders in high-stakes roles where behavioral errors have high consequences.',
    whatItMeasures: '11 behavioral derailers including Excitable, Skeptical, Cautious, Bold, and Imaginative.',
    features: ['11 derailer risk profiles', 'Stress-reaction analysis', 'Strategic risk-mitigation strategies'],
    benefits: ['Build awareness of blind spots under pressure', 'Protect organizational reputation', 'Improve executive longevity and team retention'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HDS (Hogan Development Survey)',
    useCase: ['Development', 'Coaching', 'Selection'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/d426b867f2015c65688a122825d7b6b9607cbf3eb3606dc135264e855c90ddd0"
  },
  {
    id: 'hogan-coaching',
    name: 'Hogan Coaching Report',
    provider: 'Hogan Assessments',
    category: 'Leadership & Management',
    price: 240.00,
    description: "The ultimate executive development roadmap. Integrating HPI, HDS, and MVPI, this report provides a comprehensive view of strengths, risks, and values to drive deep behavioral change.",
    bestFor: 'C-suite executives and senior leaders undergoing long-term strategic coaching.',
    whatItMeasures: 'Bright-side traits, Dark-side risks, and core motivational values.',
    features: ['Comprehensive triple-assessment integration', 'High-impact coaching focus areas', 'Strategic self-awareness benchmarks'],
    benefits: ['Drive transformative leadership growth', 'Align behavior with strategic goals', 'Achieve elite level self-mastery'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    duration: '60 mins',
    methodology: 'Full Hogan Suite Integration',
    useCase: ['Coaching', 'Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/14ea35ec51a8b83fe1db0d50373e6a71b9e4515fee057646a7f6865e1db23edd"
  },
  {
    id: 'hogan-manage',
    name: 'Hogan Manage Report',
    provider: 'Hogan Assessments',
    category: 'Leadership & Management',
    price: 100.00,
    description: "Optimizing the manager-employee dynamic. This report helps managers understand their own style and provides specific tactics for managing different types of employees effectively.",
    bestFor: 'Operational managers and team leads focused on day-to-day people performance.',
    whatItMeasures: 'Managerial behavioral tendencies and their impact on direct reports.',
    features: ['Management style profile', 'Employee engagement strategies', 'Conflict handling tips'],
    benefits: ['Improve team engagement scores', 'Tailor management to individual needs', 'Reduce friction in direct report relationships'],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI-based Management View',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/5cb35833af1daa9f99f6cafb9e3a81332e9eec9657f8ffe223510c9fa9d3d796"
  },
  {
    id: 'lhh-unconscious-bias',
    name: 'LHH Mitigating Unconscious Bias Report',
    provider: 'LHH',
    category: 'Leadership & Management',
    price: 110.00,
    description: "Foster a truly inclusive leadership culture. This report identifies hidden biases in decision-making and provides a roadmap for equitable and inclusive leadership behaviors.",
    bestFor: 'Organizations serious about DE&I and leaders who want to ensure fairness in their talent decisions.',
    whatItMeasures: 'Inclusion tendencies, bias awareness, and behavioral openness.',
    features: ['Bias profile and risk areas', 'Actionable inclusion strategies', 'Decision-making bias analysis'],
    benefits: ['Support organizational DE&I goals', 'Improve leadership fairness and trust', 'Attract and retain diverse talent'],
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Behavioral Bias Assessment',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_OTHER,
    faq: [{ question: "Is this for HR only?", answer: "No, this is most effective for line managers and executives who make daily decisions about people and strategy." }],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/59cdc45301548caa6a5d8cd2f8537404c01bd6a8ee9d07caf74b0f062f446b97"
  },

  // --- TEAM DYNAMICS ---
  {
    id: 'mbti-step1-iro',
    name: 'MBTI® Step I - Interpretive Report for Organizations',
    provider: 'The Myers-Briggs Company',
    category: 'Team Dynamics',
    price: 125.00,
    description: "Translate personality into business performance. This report applies MBTI results directly to work styles, team communication, and office problem-solving.",
    bestFor: 'Corporate teams, project groups, and managers seeking to improve collaborative output.',
    whatItMeasures: 'Personality type applied to Work Style, Communication, Problem Solving, and Leadership.',
    features: ['Business-context type interpretation', 'Team communication strategy', 'Problem-solving models'],
    benefits: ['Improve quality of team collaboration', "Reduce 'clash' between different work styles", 'Equip teams with a common language for feedback'],
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2959213?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Applied Psychometric Report',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/b5925c588d1a734ef27809c97997ee4189306ed59c0ef04342501d8244ad4b37"
  },
  {
    id: 'mbti-step1-conflict',
    name: 'MBTI® Step I™ - Conflict Style Report',
    provider: 'The Myers-Briggs Company',
    category: 'Team Dynamics',
    price: 105.00,
    description: "Handle disagreements with maturity and strategy. This report explores how your personality type reacts to conflict and offers tailored tips for resolution.",
    bestFor: 'Teams facing high friction and individuals in conflict-heavy roles like HR or Customer Success.',
    whatItMeasures: 'Conflict behaviors and triggers through the lens of MBTI type.',
    features: ['Conflict trigger analysis', 'Style-specific resolution tips', 'Blind spot identification'],
    benefits: ['Reduce emotional cost of workplace conflict', 'Move from avoidance to resolution', 'Protect team synergy during high-stress periods'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Psychometric Questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/fc1e955b193c1222706aabd32995cac582dd895b7de1f16b015a6c5100d3778b"
  },
  {
    id: 'mbti-step1-communication',
    name: 'MBTI® Step I™ - Communication Style Report',
    provider: 'The Myers-Briggs Company',
    category: 'Team Dynamics',
    price: 105.00,
    description: "Become an influential communicator. Understand your natural communication habits and learn how to adapt your message for different personality types.",
    bestFor: 'Professionals who need to influence without authority and teams seeking to align their messaging.',
    whatItMeasures: 'Verbal and written communication preferences and influence styles.',
    features: ['Communication habit mapping', 'Influencing strategies by type', 'Action plan for effective messaging'],
    benefits: ['Increase personal impact and influence', 'Ensure clarity in cross-functional communication', "Minimize 'lost in translation' errors in teams"],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Psychometric Questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/71de3d30c33b766251b5eaa1b4028c2d18a8f3bb30c642d83181fa516203c8cf"
  },
  {
    id: 'tki-profile-interpretive',
    name: 'TKI Profile and Interpretive Report',
    provider: 'The Myers-Briggs Company',
    category: 'Team Dynamics',
    price: 90.00,
    description: "The world's #1 tool for conflict management. TKI helps individuals understand their default conflict mode and provides a toolkit for choosing more strategic responses.",
    bestFor: 'Teams, mediators, and negotiators looking for quick, high-impact behavioral change.',
    whatItMeasures: 'Five conflict-handling modes: Competing, Collaborating, Compromising, Avoiding, and Accommodating.',
    features: ['Clear conflict-mode profiling', 'Situational application guide', 'Flexibility improvement roadmap'],
    benefits: ['Improve speed of consensus-building', 'Equip teams to handle difficult debates safely', 'Increase tactical negotiation effectiveness'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    duration: '15 mins',
    methodology: 'Forced-choice Behavioral Mapping',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_MBTI,
    faq: [{ question: "Is there a 'right' style?", answer: "No, TKI teaches that all five modes are useful. Success is about choosing the right mode for the right situation." }],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/ff5217c6155864cc055e37ded7d955e12608baa6c0fb83fafd71fdd6fc9a65a2"
  },
  {
    id: 'work-engagement-profile-interpretive',
    name: 'Work Engagement Profile Interpretive Report',
    provider: 'The Myers-Briggs Company',
    category: 'Team Dynamics',
    price: 85.00,
    description: "Unlock the secret to high engagement. This profile measures the intrinsic rewards that drive employee passion and commitment, helping to prevent burnout and turnover.",
    bestFor: 'Organizations facing low morale or high turnover and managers looking to boost team energy.',
    whatItMeasures: 'Four intrinsic rewards: Meaningfulness, Choice, Competence, and Progress.',
    features: ['Intrinsic reward scores', 'Engagement level analysis', 'Practical engagement development tips'],
    benefits: ['Identify and mitigate burnout early', 'Create a more energized workplace', 'Improve employee retention and performance'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    duration: '15 mins',
    methodology: 'Intrinsic Reward Assessment',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_MBTI,
    faq: [{ question: "Is this like an engagement survey?", answer: "No, most surveys ask about 'satisfaction.' This measures the 'internal engine' of engagement—the intrinsic rewards a person feels at work." }],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/c68c3cd19af1a6f863ec6bae70d1b8975d0b65760ffb9eec838eb604e979a0f3"
  },

  // --- CAREER DEVELOPMENT ---
  {
    id: 'mbti-step1-career',
    name: 'MBTI® Step I™ - Career Report',
    provider: 'The Myers-Briggs Company',
    category: 'Career Development',
    price: 75.00,
    description: "Align your personality with your career path. This report helps you find professional satisfaction by matching your type to optimal work environments and career fields.",
    bestFor: 'Job seekers, students, and professionals looking for more fulfilling career options.',
    whatItMeasures: 'Personality-to-career fit and workplace satisfaction factors.',
    features: ['Type-specific career recommendations', 'Preferred work-style analysis', 'Challenges in career search by type'],
    benefits: ['Target your job search more effectively', 'Identify why previous roles were dissatisfying', 'Gain confidence in career transitions'],
    image: 'https://images.unsplash.com/photo-1508833303163-e4d3521d798a?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Psychometric Questionnaire',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/fcbfc22fc5633b31f8c7a51487f775acec80571d4a14df99342b87cc9a50ca33"
  },
  {
    id: 'istartstrong',
    name: 'iStartStrong',
    provider: 'The Myers-Briggs Company',
    category: 'Career Development',
    price: 40.00,
    description: "Ignite your professional journey. Using the Strong Interest Inventory framework, this report maps your personal interests to real-world career and educational paths.",
    bestFor: 'Students and early-career pivoters looking for scientific validation of their career interests.',
    whatItMeasures: 'Career interest themes (RIASEC) and specific professional interest areas.',
    features: ['Top career recommendations', 'Educational path mapping', 'Direct links to career databases'],
    benefits: ['Discover paths you hadn\'t considered', 'Validate existing career intuitions', 'Save time on educational planning'],
    image: 'https://images.unsplash.com/photo-1513258496099-48168024adb0?auto=format&fit=crop&w=800&q=80',
    duration: '20 mins',
    methodology: 'Interest-based Mapping',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: [{ question: "Is this for students only?", answer: "No, it is highly valuable for adults looking to pivot or find a hobby-turned-career." }],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/0bde01cc0584f68656d9d48882c74102c1d47c6ff1de3e6ac38be00f28e0b167"
  },
  {
    id: 'hogan-career',
    name: 'Hogan Career Report',
    provider: 'Hogan Assessments',
    category: 'Career Development',
    price: 100.00,
    description: "How others see your professional brand. This report focuses on your workplace reputation and strengths, identifying the roles where your natural personality will shine.",
    bestFor: 'Professionals focused on personal branding and upward career mobility.',
    whatItMeasures: 'Occupational strengths, potential derailers, and career drivers.',
    features: ['Reputational trait mapping', 'Developmental action plan', 'Workplace culture fit analysis'],
    benefits: ["Understand your 'market value'", 'Address weaknesses before they impact promotion', 'Align your career path with your core reputation'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI-based Career View',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/a1078325e0d09ca9a45fc14c5a756a16594db4bb5ca9f6a71aa83012a83e6dcd"
  },

  // --- SALES & SAFETY ---
  {
    id: 'hogan-sales',
    name: 'Hogan Sales Basis Report',
    provider: 'Hogan Assessments',
    category: 'Sales & Safety',
    price: 210.00,
    description: "Identify top sales hunters. This report evaluates candidates against the specific personality traits that predict success in high-pressure sales roles.",
    bestFor: 'Sales directors and HR hiring for revenue-generating roles.',
    whatItMeasures: 'Sales potential, persistence, resilience, and relationship-building capacity.',
    features: ['8 core sales competencies', 'Sales cycle strength analysis', 'Coaching guide for sales performance'],
    benefits: ['Hire revenue-generators with certainty', 'Identify training needs for your current sales force', 'Reduce turnover in high-pressure sales environments'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI + MVPI Sales Mapping',
    useCase: ['Hiring', 'Selection', 'Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/6c32b5f38b926e3e75d0d2278952dfbbf87e5b83ea187091fa7ee6c8f7046769"
  },
  {
    id: 'hogan-safety',
    name: 'Hogan Safety Development Report',
    provider: 'Hogan Assessments',
    category: 'Sales & Safety',
    price: 100.00,
    description: "Minimize workplace risk. This report measures safety awareness and identifies candidates who may be prone to reckless or distracted behaviors in high-risk environments.",
    bestFor: 'Industrial, transport, and healthcare organizations where safety is paramount.',
    whatItMeasures: '6 safety-related traits: Defiant, Panicky, Irritable, Distractible, Reckless, and Arrogant.',
    features: ['Safety risk profile', 'Behavioral safety coaching', 'Risk reduction action items'],
    benefits: ['Reduce workplace accidents and liability', 'Improve safety culture through selection', 'Identify employees who need specific safety monitoring'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI Safety Mapping',
    useCase: ['Hiring', 'Selection', 'Development'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/c4b8a83fd49252cb32cd555961f6de14321baa7619193a5c285d8d565f668139"
  },

  // --- PROFESSIONAL SKILLS ---
  {
    id: 'mbti-step1-decision',
    name: 'MBTI® Step I™ - Decision-Making Style Report',
    provider: 'The Myers-Briggs Company',
    category: 'Professional Skills',
    price: 105.00,
    description: "Make better choices. Analyze your natural decision-making style, identify potential cognitive biases, and learn a framework for more balanced information gathering.",
    bestFor: 'Managers, project leads, and professionals in decision-heavy roles.',
    whatItMeasures: 'Information gathering and evaluation preferences based on MBTI.',
    features: ['Decision-style analysis', 'Bias identification', 'Strategy for balanced decisions'],
    benefits: ['Avoid groupthink and personal bias', 'Improve the speed and quality of organizational decisions', 'Gain consensus more effectively'],
    image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Applied Psychometric Report',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/4fe5fb78ba388dff29cf11ae5f8100f3ecb473458ce4c15a9d68281e6c4efba5"
  },
  {
    id: 'mbti-step1-stress',
    name: 'MBTI® Step I™ - Stress Management Report',
    provider: 'The Myers-Briggs Company',
    category: 'Professional Skills',
    price: 105.00,
    description: "Build resilience under pressure. Identifies your unique stress triggers and behavioral reactions, offering customized coping mechanisms to prevent burnout.",
    bestFor: 'High-pressure professionals and teams facing rapid change.',
    whatItMeasures: 'Stress indicators, triggers, and reactions by personality type.',
    features: ['Stress trigger identification', 'Customized coping strategies', 'Resilience building roadmap'],
    benefits: ['Prevent long-term burnout', 'Maintain professional effectiveness during crises', 'Improve personal health and workplace well-being'],
    image: 'https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Applied Psychometric Report',
    useCase: ['Development', 'Coaching'],
    level: ['Individual'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/b2227e06d5ae6d0064fcc5ca7bd3dc52e8a583c1fbad088db240e0ce36bc6b5c"
  },
  {
    id: 'mbti-step1-healthcare',
    name: 'MBTI® Step I™ - Healthcare Professionals Report',
    provider: 'The Myers-Briggs Company',
    category: 'Professional Skills',
    price: 100.00,
    description: "Elevate patient care through personality awareness. Designed for clinical settings to improve patient communication and healthcare team dynamics.",
    bestFor: 'Doctors, nurses, and allied health professionals.',
    whatItMeasures: 'Personality preferences applied to clinical communication and teamwork.',
    features: ['Patient interaction tips', 'Healthcare team dynamic analysis', 'Caregiver self-care strategies'],
    benefits: ['Improve patient satisfaction and compliance', 'Reduce clinician burnout', 'Enhance multi-disciplinary team coordination'],
    image: 'https://images.unsplash.com/photo-1505751172177-51bd1825f00d?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'Sector-specific Applied Psychometric',
    useCase: ['Development', 'Coaching'],
    level: ['Individual', 'Team'],
    guidance: GUIDANCE_MBTI,
    faq: FAQ_MBTI_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/bb5e3b25d9460e296dae330045e8d72e17f949bc12eee84272f098b1a61f8a97"
  },

  // --- OTHERS (FLASH, EQ, COMPASS) ---
  {
    id: 'hogan-flash',
    name: 'Hogan Flash Report',
    provider: 'Hogan Assessments',
    category: 'Behavior & Personality',
    price: 180.00,
    description: "Data-at-a-glance for experts. A graphical snapshot of HPI, HDS, and MVPI scores without narrative text, designed for certified practitioners.",
    bestFor: 'Certified Hogan coaches and HR practitioners who need raw data for their own interpretation.',
    whatItMeasures: 'Raw scores across all primary Hogan scales.',
    features: ['HPI, HDS, and MVPI graphical data', 'No narrative text', 'Fast data access'],
    benefits: ['Cost-effective for high-volume certified users', 'Avoid generic narrative for custom coaching', 'Immediate data visualization'],
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&w=800&q=80',
    duration: '60 mins',
    methodology: 'Full Suite Raw Data',
    useCase: ['Coaching', 'Selection'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: [{ question: "Why is there no text?", answer: "This is for experts. Narrative can sometimes distract from the raw score patterns that a certified coach identifies." }],
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/6191208aa4352ca23b2560d96fb87eb7e2526def59b17f9baae0725a37ed03bf"
  },
  {
    id: 'hogan-compass',
    name: 'Hogan Compass Report',
    provider: 'Hogan Assessments',
    category: 'Behavior & Personality',
    price: 100.00,
    description: "Find your motivational north star. Unpacks your core values and interests to determine organizational fit and career direction.",
    bestFor: 'Talent managers focusing on cultural fit and employees seeking career meaning.',
    whatItMeasures: '10 core values including Power, Security, Altruism, and Science.',
    features: ['Value-based career mapping', 'Preferred culture analysis', 'Motivational profile'],
    benefits: ['Ensure deep alignment between employee and culture', 'Identify intrinsic motivators to boost engagement', 'Map career paths based on values, not just skills'],
    image: 'https://images.unsplash.com/photo-1490127252417-7c393f993ee4?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'MVPI (Motives, Values, Preferences Inventory)',
    useCase: ['Selection', 'Development'],
    level: ['Individual', 'Organization'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/6a8d7b8648c740a3382ac19362476e3b8d4976ca485aedb97cfad9cfe7f24dbe"
  },
  {
    id: 'hogan-eq',
    name: 'Hogan EQ Report',
    provider: 'Hogan Assessments',
    category: 'Behavior & Personality',
    price: 150.00,
    description: "Measure the 'Soft Skills' that drive 'Hard Results.' Assesses emotional intelligence based on stable personality traits rather than temporary mood.",
    bestFor: 'Sales leaders and executives who need to master social influence.',
    whatItMeasures: '6 EQ Competencies: Awareness, Regulation, Influence, etc.',
    features: ['Competency-based EQ scores', 'Behavioral Pros/Cons', 'Coaching tips'],
    benefits: ['Quantify emotional impact', 'Identify socially intuitive leaders', 'Improve negotiation and influence'],
    image: 'https://images.unsplash.com/photo-1518173835740-f5d14111d76a?auto=format&fit=crop&w=800&q=80',
    duration: '30 mins',
    methodology: 'HPI + HDS EQ Mapping',
    useCase: ['Development', 'Selection'],
    level: ['Individual'],
    guidance: GUIDANCE_OTHER,
    faq: FAQ_HOGAN_SALES,
    sampleReportUrl: "https://workdrive.zohoexternal.com/external/2632729437993b53b3dc604a7ddb7f1366445fbfaef98ddb38e18cd393762050"
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
      <p>While IQ helps a leader determine <em>what</em> needs to be done, EQ dictates <em>how</em> it gets done through people. Leaders with high EQ can read the room, understand non-verbal cues, and manage their own stress, preventing "emotional leakage" that can demoralize a team.</p>
      <h3>Predicting Performance with Hogan EQ</h3>
      <p>Modern psychometric tools like the Hogan EQ Report allow organizations to quantify these soft skills. By measuring awareness, regulation, and influence, companies can identify which high-potential candidates actually have the social maturity to lead complex organizations through periods of change.</p>
    `
  },
  {
    id: '2',
    title: 'The Science of Personality: Why MBTI Remains Relevant',
    excerpt: 'Despite critics, the Myers-Briggs framework continues to be the world’s most popular tool for team building. Learn why its non-judgmental approach works.',
    category: 'Team Building',
    date: 'Oct 18, 2024',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Mark Sterling',
    readTime: '5 min read',
    content: `
      <p>The Myers-Briggs Type Indicator (MBTI) is often a topic of debate in academic circles, yet its adoption in the Fortune 500 remains nearly universal. Why? Because the goal of MBTI isn't to put people in boxes, but to build a bridge of understanding between differing work styles.</p>
      <h3>The Power of a Shared Language</h3>
      <p>When a team understands that "Introversion" isn't about being shy, but about how one recharges energy, conflict drops. MBTI provides a positive, non-judgmental vocabulary that allows team members to say, "I'm a Perceiving type, I need to explore options," rather than "I'm disorganized."</p>
      <h3>Beyond the Test: Development</h3>
      <p>Effective MBTI application focuses on development. By using tools like the Step II Interpretive Report, leaders can see the 20 distinct facets of their personality, helping them understand internal behavioral contradictions and refine their communication strategy for maximum team impact.</p>
    `
  },
  {
    id: '3',
    title: 'Navigating Workplace Conflict with TKI',
    excerpt: 'Conflict is inevitable, but its cost doesn’t have to be. Discover the five modes of conflict resolution and how to use them strategically.',
    category: 'Conflict Management',
    date: 'Oct 22, 2024',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Julianne Russo',
    readTime: '4 min read',
    content: `
      <p>Workplace conflict costs companies billions in lost productivity and turnover annually. Most people have a "default" reaction to conflict—some avoid, some compete. The Thomas-Kilmann Conflict Mode Instrument (TKI) teaches us that there is no one "right" way to handle conflict; there are only more or less strategic choices.</p>
      <h3>The Five Modes</h3>
      <p>The TKI framework identifies five modes: Competing, Collaborating, Compromising, Avoiding, and Accommodating. Successful leaders are "multi-lingual" in these modes, knowing when to stand their ground (Competing) and when to prioritize the relationship (Accommodating).</p>
      <h3>Immediate Team Impact</h3>
      <p>Using TKI in a team setting allows members to map their collective default styles. If a whole team is "Avoiders," critical issues will never be discussed. If they are all "Competitors," they will burn out. Awareness is the first step toward a more resilient and productive team culture.</p>
    `
  },
  {
    id: '4',
    title: 'Identifying High-Potential Leaders with Hogan Assessments',
    excerpt: 'Reputation is the only metric that matters in leadership. Learn how Hogan predicts performance by measuring how others see you.',
    category: 'Leadership',
    date: 'Oct 25, 2024',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Robert Hogan',
    readTime: '7 min read',
    content: `
      <p>In the world of psychometrics, there is a distinction between "identity" (how you see yourself) and "reputation" (how others see you). In leadership, reputation is the only thing that drives business results. This is why Hogan Assessments are considered the gold standard for executive selection.</p>
      <h3>The "Dark Side" of Personality</h3>
      <p>Most leaders perform well under normal circumstances. The true test comes during stress, boredom, or heavy workload. The Hogan Challenge Report identifies 11 "derailers"—traits that might be strengths in moderation but become toxic under pressure, such as being overly cautious or imaginative to a fault.</p>
      <h3>Strategic Alignment</h3>
      <p>By using the full Hogan suite, organizations can align a leader's core values with the company culture. If a leader values Altruism but the company culture is purely driven by Power and Commercial interests, the hire will fail regardless of the candidate's IQ. Data-driven selection prevents these expensive cultural mismatches.</p>
    `
  },
  {
    id: '5',
    title: 'The Future of Recruitment: Data Over Gut Feeling',
    excerpt: 'Unconscious bias sabotages even the best hiring processes. See how objective assessments level the playing field and improve hire quality.',
    category: 'HR Strategy',
    date: 'Oct 30, 2024',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Elena Rodriguez',
    readTime: '5 min read',
    content: `
      <p>Traditional interviews are notoriously poor predictors of job performance. Research suggests that most interviewers make a decision within the first 90 seconds, often based on affinity bias—hiring someone because they "feel like a good fit." The future of talent acquisition lies in moving from "gut feeling" to objective data.</p>
      <h3>Removing the Mask</h3>
      <p>Candidates are coached to provide the "right" answers in interviews. Validated behavioral assessments like Apollo or Saville Wave remove this mask by using complex algorithms to detect social desirability and "faking," providing a true view of a candidate's motives and talents.</p>
      <h3>Diversity and Inclusion</h3>
      <p>When you rely on standardized assessments, you reduce the impact of unconscious bias. Every candidate is measured against the same benchmarks of performance. This not only improves the quality of the hire but naturally fosters a more diverse and equitable workforce by focusing on merit and potential over background.</p>
    `
  },
  {
    id: '6',
    title: 'Building Resilience in High-Velocity Environments',
    excerpt: 'Burnout is a systemic risk. Learn how to identify stress triggers early and build a resilient workforce using personality insights.',
    category: 'Employee Wellbeing',
    date: 'Nov 2, 2024',
    image: 'https://images.unsplash.com/photo-1516533075015-a3838414c3ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Thomas Wright',
    readTime: '6 min read',
    content: `
      <p>In today's "always-on" corporate culture, resilience is no longer just a personal trait—it's a critical organizational capability. High turnover and low engagement are often the late-stage symptoms of a workforce that lacks the tools to manage systemic stress.</p>
      <h3>Identifying Triggers</h3>
      <p>Not everyone is stressed by the same things. Using MBTI Stress Management reports, organizations can see that some employees are drained by lack of clear structure (Judging preference), while others are stressed by too much rigid process (Perceiving preference). Customizing the work environment to these needs prevents burnout.</p>
      <h3>The Role of Intrinsic Reward</h3>
      <p>Engagement isn't just about satisfaction; it's about reward. The Work Engagement Profile helps leaders understand the four pillars of intrinsic motivation: Meaningfulness, Choice, Competence, and Progress. When employees feel these rewards, their natural resilience increases, allowing them to navigate high-velocity changes without losing productivity.</p>
    `
  }
];
