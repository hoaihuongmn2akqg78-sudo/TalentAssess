import React from 'react';
import { ArrowLeft, BookOpen, ShieldCheck, LifeBuoy, FileText, ChevronRight } from 'lucide-react';

export type InfoPageType = 'guide' | 'support' | 'privacy' | 'terms';

interface InfoPageProps {
  pageType: InfoPageType;
  onBack: () => void;
  onNavigate: (type: InfoPageType) => void;
}

const InfoPage: React.FC<InfoPageProps> = ({ pageType, onBack, onNavigate }) => {
  const menuItems = [
    { id: 'guide', label: 'Assessment Guide', icon: BookOpen },
    { id: 'support', label: 'Technical Support', icon: LifeBuoy },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
  ];

  const renderContent = () => {
    switch (pageType) {
      case 'guide':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-serif font-bold text-[#0C3963] mb-8">Assessment Guide</h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Welcome to the Talentassess platform. Our goal is to make your professional development journey as seamless as possible. This guide outlines the end-to-end process of our assessment services.
            </p>

            <div className="space-y-12">
              <section>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#E0E9F4] text-[#0C3963] rounded-full flex items-center justify-center font-bold">1</div>
                  <h2 className="text-2xl font-bold text-gray-900">Selection & Purchase</h2>
                </div>
                <div className="pl-14 space-y-4 text-gray-700">
                  <p>Choose from our catalog of scientifically validated instruments. If you are unsure, use our <strong>Gemini Advisor</strong> or the <strong>Assessment Wizard</strong> to find the tool that matches your specific goal (e.g., leadership development, team cohesion, or hiring).</p>
                  <p>During checkout, you can assign assessments to yourself or others. Ensure all participant emails are correct as credentials will be sent to these addresses.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#E0E9F4] text-[#0C3963] rounded-full flex items-center justify-center font-bold">2</div>
                  <h2 className="text-2xl font-bold text-gray-900">Credential Delivery</h2>
                </div>
                <div className="pl-14 space-y-4 text-gray-700">
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>PayPal Orders:</strong> Access codes and questionnaire links are typically dispatched automatically within 30 minutes of payment.</li>
                    <li><strong>Bank Transfers:</strong> Credentials will be released within 2 working days once funds are verified by our finance team.</li>
                  </ul>
                  <p className="bg-amber-50 p-4 border-l-4 border-amber-400 text-sm italic">
                    Note: Please check your Junk/Spam folders if you do not see an email from "The Myers-Briggs Company", "Hogan Assessments", or "LHH Indochine".
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#E0E9F4] text-[#0C3963] rounded-full flex items-center justify-center font-bold">3</div>
                  <h2 className="text-2xl font-bold text-gray-900">Taking the Assessment</h2>
                </div>
                <div className="pl-14 space-y-4 text-gray-700">
                  <p>Follow the link in your email. Most assessments do not have a strict time limit (except for Aptitude tests), but we recommend completing them in a single sitting in a quiet environment.</p>
                  <p><strong>Be Honest:</strong> Psychometric tools work best when you provide spontaneous, genuine responses. There are no "right" or "wrong" answers in personality assessments.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#E0E9F4] text-[#0C3963] rounded-full flex items-center justify-center font-bold">4</div>
                  <h2 className="text-2xl font-bold text-gray-900">Report Generation</h2>
                </div>
                <div className="pl-14 space-y-4 text-gray-700">
                  <p>Once you complete the survey, your results are processed. Depending on the product, your report will be emailed to you as a PDF within 1-2 working days.</p>
                  <p>If you purchased an <strong>Expert Debriefing</strong>, one of our consultants will contact you to schedule a 60-minute feedback session to help you interpret the results and build an action plan.</p>
                </div>
              </section>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-serif font-bold text-[#0C3963] mb-8">Technical Support</h1>
            <div className="prose prose-blue max-w-none text-gray-700">
              <p className="text-lg">Encountering an issue? Most technical problems can be solved by checking the following requirements.</p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">System Requirements</h3>
              <ul className="space-y-2">
                <li><strong>Browsers:</strong> Latest versions of Chrome, Edge, Safari, or Firefox. Internet Explorer is not supported.</li>
                <li><strong>Cookies:</strong> Your browser must have "Third-party cookies" enabled to allow the assessment platform to track progress.</li>
                <li><strong>Pop-ups:</strong> Some reports open in new windows; ensure pop-up blockers are disabled for our domain.</li>
              </ul>

              <h3 className="text-xl font-bold mt-10 mb-4">Common Issues</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#0C3963] mb-2">The link says it has expired</h4>
                  <p className="text-sm">Assessment links are typically valid for 30 days. If yours has expired, please contact us with your order reference number to request a refresh.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#0C3963] mb-2">The page froze during the survey</h4>
                  <p className="text-sm">Close your browser window and wait 5 minutes. Re-click the link from your email. Our systems auto-save progress, and you should be returned to the last completed question.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#0C3963] mb-2">I haven't received my PDF report</h4>
                  <p className="text-sm">Reports are manually reviewed for quality and released within 48 business hours. If it has been longer, please email our support desk.</p>
                </div>
              </div>

              <div className="mt-12 p-8 bg-[#0C3963] text-white rounded-xl text-center">
                <h3 className="text-xl font-bold mb-4">Still need help?</h3>
                <p className="mb-6 opacity-90">Our technical team is available Monday – Friday, 8:30 AM to 5:30 PM (ICT).</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                   <a href="mailto:support@lhh.com.vn" className="font-bold underline">support@lhh.com.vn</a>
                   <span>+84 28 3511 6022</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-serif font-bold text-[#0C3963] mb-8">Privacy Policy</h1>
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-6">
              <p>Last Updated: October 2024</p>
              <p>Lee Hecht Harrison Indochine ("we", "us", or "our") is committed to protecting the privacy and security of your personal data. This policy explains how we handle information collected through the Talentassess platform.</p>
              
              <h3 className="text-gray-900 font-bold text-lg">1. Data Collection</h3>
              <p>We collect personal identifiers (name, email) and demographic data (job level, industry) required to administer assessments. During the assessment, you provide responses to psychometric items which are processed to generate your profile.</p>

              <h3 className="text-gray-900 font-bold text-lg">2. Data Sharing</h3>
              <p>To provide our services, we share your data with authorized third-party assessment providers including, but not limited to, The Myers-Briggs Company, Hogan Assessments, and Saville Assessment. These providers are strictly bound by confidentiality agreements and global data protection standards (GDPR).</p>

              <h3 className="text-gray-900 font-bold text-lg">3. Use of Data</h3>
              <p>Your results are used solely for the purpose of generating your professional reports and providing coaching feedback. We do not sell your personal data to third parties for marketing purposes.</p>

              <h3 className="text-gray-900 font-bold text-lg">4. Data Retention</h3>
              <p>Assessment results are stored securely for a period of 24 months to allow for year-over-year progress tracking, after which they are anonymized for research purposes or deleted upon request.</p>

              <h3 className="text-gray-900 font-bold text-lg">5. Your Rights</h3>
              <p>You have the right to access your data, request corrections, or ask for the deletion of your records. Please contact our Data Protection Officer at privacy@lhh.com.vn for any inquiries.</p>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-serif font-bold text-[#0C3963] mb-8">Terms of Service</h1>
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-6">
              <p>By accessing and using the Talentassess platform, you agree to be bound by the following terms and conditions.</p>
              
              <h3 className="text-gray-900 font-bold text-lg">1. Digital Products & Refunds</h3>
              <p>Assessments are considered "digital content" and "personalized services." Once an assessment access code or link has been generated and emailed to the participant, the order is <strong>non-refundable</strong>. Cancellations are only permitted if requested before the dispatch of credentials.</p>

              <h3 className="text-gray-900 font-bold text-lg">2. Accuracy of Results</h3>
              <p>Psychometric assessments are self-report instruments designed for development and awareness. We provide no guarantee that the results will meet your specific expectations or predict future performance with 100% accuracy. Interpretation should always be conducted in context with other professional data points.</p>

              <h3 className="text-gray-900 font-bold text-lg">3. Intellectual Property</h3>
              <p>All assessment materials, questionnaires, and report frameworks are the intellectual property of their respective owners (e.g., LHH, Hogan, MBTI). You may not reproduce, redistribute, or use these materials for commercial purposes without explicit written consent.</p>

              <h3 className="text-gray-900 font-bold text-lg">4. Liability</h3>
              <p>Lee Hecht Harrison Indochine shall not be liable for any decisions made based on assessment results. The responsibility for career or organizational actions rests solely with the user or the purchasing organization.</p>

              <h3 className="text-gray-900 font-bold text-lg">5. Governing Law</h3>
              <p>These terms are governed by the laws of the Socialist Republic of Vietnam. Any disputes arising shall be resolved through the competent courts of Ho Chi Minh City.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner */}
      <div className="bg-[#0C3963] py-12">
        <div className="container mx-auto px-6 md:px-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-4 font-bold text-sm uppercase transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="text-[#C7593A] font-bold uppercase tracking-widest text-xs mb-2">Legal & Documentation</div>
          <h2 className="text-3xl text-white font-serif font-bold">Information Center</h2>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar Nav */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <nav className="sticky top-32 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as InfoPageType)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-all group ${
                    pageType === item.id 
                    ? 'bg-[#E0E9F4] text-[#0C3963] font-bold shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={pageType === item.id ? 'text-[#0C3963]' : 'text-gray-400 group-hover:text-gray-600'} />
                    <span>{item.label}</span>
                  </div>
                  {pageType === item.id && <ChevronRight size={16} />}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <article className="flex-1 max-w-4xl">
            {renderContent()}
          </article>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;