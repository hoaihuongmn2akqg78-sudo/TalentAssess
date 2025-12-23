
export interface FAQ {
  question: string;
  answer: string;
}

export interface Assessment {
  id: string;
  name: string;
  provider: string;
  category: 'Personality' | 'Leadership' | 'Aptitude' | '360 Feedback' | 'Learning Agility' | 'Team Effectiveness' | 'Sales & Safety' | 'Cognitive Ability';
  price: number;
  description: string;
  whatItMeasures: string;
  features: string[]; // "What It Measures" bullet points
  benefits: string[]; // "Key Benefits"
  bestFor: string;
  image: string;
  duration: string;
  methodology: string;
  useCase: ('Hiring' | 'Development' | 'Coaching' | 'Selection')[];
  level: ('Individual' | 'Team' | 'Organization')[];
  guidance: string; // New field for post-payment instructions
  faq: FAQ[]; // New field for product specific FAQs
  sampleReportUrl?: string; // New field for sample report links
}

export interface CartItem extends Assessment {
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content?: string;
  author?: string;
  readTime?: string;
}