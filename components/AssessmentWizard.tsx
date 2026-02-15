import React, { useState } from 'react';
import { X, ChevronRight, Circle, CheckCircle, Loader2, FileText, Home, ArrowRight } from 'lucide-react';
import { Assessment } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  assessments: Assessment[];
  onSelectProduct: (assessment: Assessment) => void;
  initialType?: 'individual' | 'organization' | null;
  onViewDetails: (assessment: Assessment) => void;
  onNavigateToBrowse: () => void;
  onNavigateToHome: () => void;
}

const AssessmentWizard: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  assessments, 
  onSelectProduct, 
  initialType,
  onViewDetails,
  onNavigateToBrowse,
  onNavigateToHome
}) => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'individual' | 'organization' | null>(initialType || null);
  const [goal, setGoal] = useState<string>('');
  const [contextText, setContextText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Reset state when opening
  React.useEffect(() => {
    if (isOpen) {
      if (initialType) {
        setUserType(initialType);
        setStep(2);
      } else {
        setStep(1);
        setUserType(null);
      }
      setGoal('');
      setContextText('');
      setIsAnalyzing(false);
    }
  }, [isOpen, initialType]);

  const handleUserTypeSelect = (type: 'individual' | 'organization') => {
    setUserType(type);
  };

  const handleNextStep = () => {
     if (step === 1 && userType) setStep(2);
     else if (step === 2 && goal) setStep(3);
     else if (step === 3 && contextText.trim().length > 0) {
        handleFindMatch();
     }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFindMatch = () => {
    setIsAnalyzing(true);
    // Simulate smart analysis delay
    setTimeout(() => {
        setIsAnalyzing(false);
        setStep(4);
    }, 1800);
  };

  const getRecommendations = () => {
    let results: Assessment[] = [];

    if (userType === 'individual') {
      if (goal === 'growth') results = assessments.filter(a => a.id === 'mbti-step1-profile' || a.id === 'apollo');
      else if (goal === 'leadership') results = assessments.filter(a => a.id === 'hogan-leader-focus' || a.id === 'hogan-eq');
      else if (goal === 'career') results = assessments.filter(a => a.id === 'istartstrong' || a.id === 'mbti-step1-career');
      else results = assessments.filter(a => a.category === 'Behavior & Personality');
    } else {
      if (goal === 'hiring') results = assessments.filter(a => a.id === 'apollo' || a.id === 'hogan-sales');
      else if (goal === 'leadership') results = assessments.filter(a => a.id === 'hogan-leader-focus' || a.id === 'hogan-challenge');
      else if (goal === 'team') results = assessments.filter(a => a.id === 'tki-profile-interpretive' || a.id === 'work-engagement-profile-interpretive');
      else if (goal === 'conflict') results = assessments.filter(a => a.id === 'tki-profile-interpretive' || a.id === 'mbti-step1-conflict');
      else results = assessments.filter(a => a.category === 'Leadership & Management');
    }
    
    if (results.length === 0) return assessments.slice(0, 3);
    return results.slice(0, 3);
  };

  const recommendations = getRecommendations();
  
  const getGoalLabel = (key: string) => {
     const map: Record<string, string> = {
         'growth': 'Self-Discovery & Growth',
         'leadership': 'Leadership Development',
         'career': 'Career Direction',
         'hiring': 'Hiring & Selection',
         'team': 'Team Cohesion',
         'succession': 'Succession Planning',
         'conflict': 'Conflict Resolution'
     };
     return map[key] || key;
  };

  const handleFinishAndHome = () => {
    onNavigateToHome();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/98 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl animate-in zoom-in-95 duration-200">
        
        {/* Header / Nav */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="text-3xl font-extrabold tracking-tight text-[#0C3963] font-serif cursor-pointer" onClick={handleFinishAndHome}>
                TALENT<span className="text-gray-400 font-sans font-light text-2xl">ASSESS</span>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
               <button 
                  onClick={handleFinishAndHome} 
                  className="hover:text-[#0C3963] transition-colors"
               >
                 Home
               </button>
               <button className="text-[#0C3963] font-bold">Find Your Path</button>
               <button 
                  onClick={() => { onNavigateToBrowse(); onClose(); }} 
                  className="hover:text-[#0C3963] transition-colors"
               >
                 Browse All
               </button>
               <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                  <X size={24} />
               </button>
            </div>
        </div>

        {/* Progress Bar Area */}
        {step < 4 && (
          <div className="mb-10">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  <span className={step >= 1 ? "text-[#0C3963]" : ""}>Role</span>
                  <ChevronRight size={14} />
                  <span className={step >= 2 ? "text-[#0C3963]" : ""}>Goal</span>
                  <ChevronRight size={14} />
                  <span className={step >= 3 ? "text-[#0C3963]" : ""}>Context</span>
              </div>
              
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#0C3963] transition-all duration-500 ease-out"
                    style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : step === 3 ? '90%' : '100%' }}
                  />
              </div>
          </div>
        )}

        {/* Main Content */}
        <div className="min-h-[450px]">
            {step === 1 && (
                <div className="animate-in slide-in-from-right duration-300">
                    <h2 className="text-4xl font-serif font-bold text-[#0C3963] mb-4">Who is this assessment for?</h2>
                    <p className="text-gray-500 mb-10 text-lg">We offer tailored instruments for both personal growth and corporate selection.</p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <button 
                            onClick={() => handleUserTypeSelect('individual')}
                            className={`text-left p-10 rounded-2xl border-2 transition-all h-72 flex flex-col justify-center relative group ${
                                userType === 'individual' 
                                ? 'border-[#0C3963] bg-[#E0E9F4]/30' 
                                : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg'
                            }`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${userType === 'individual' ? 'bg-[#0C3963] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0C3963] mb-4">For Myself</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                I want to explore my personality, strengths, career interests, or leadership potential.
                            </p>
                            {userType === 'individual' && <div className="absolute top-4 right-4 text-[#0C3963] font-bold text-xs uppercase tracking-widest">Selected</div>}
                        </button>

                         <button 
                            onClick={() => handleUserTypeSelect('organization')}
                            className={`text-left p-10 rounded-2xl border-2 transition-all h-72 flex flex-col justify-center relative group ${
                                userType === 'organization' 
                                ? 'border-[#0C3963] bg-[#E0E9F4]/30' 
                                : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg'
                            }`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${userType === 'organization' ? 'bg-[#0C3963] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0C3963] mb-4">For My Organization</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                I need to screen candidates, develop a leadership pipeline, or optimize team chemistry.
                            </p>
                            {userType === 'organization' && <div className="absolute top-4 right-4 text-[#0C3963] font-bold text-xs uppercase tracking-widest">Selected</div>}
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                 <div className="animate-in slide-in-from-right duration-300 max-w-3xl">
                    <h2 className="text-4xl font-serif font-bold text-[#0C3963] mb-4">What is your primary goal?</h2>
                    <p className="text-gray-500 mb-10 text-lg">Select the outcome that best describes your current requirement.</p>
                    <div className="space-y-4">
                         {userType === 'individual' ? (
                            <>
                                <RadioOption selected={goal === 'growth'} onClick={() => setGoal('growth')} label="Self-Discovery & Personal Growth" />
                                <RadioOption selected={goal === 'leadership'} onClick={() => setGoal('leadership')} label="Leadership Development" />
                                <RadioOption selected={goal === 'career'} onClick={() => setGoal('career')} label="Career Exploration & Direction" />
                            </>
                         ) : (
                            <>
                                <RadioOption selected={goal === 'hiring'} onClick={() => setGoal('hiring')} label="Recruitment & Talent Selection" />
                                <RadioOption selected={goal === 'leadership'} onClick={() => setGoal('leadership')} label="Leadership Succession & Pipeline" />
                                <RadioOption selected={goal === 'team'} onClick={() => setGoal('team')} label="Team Engagement & Synergy" />
                                <RadioOption selected={goal === 'conflict'} onClick={() => setGoal('conflict')} label="Conflict Resolution & Communication" />
                            </>
                         )}
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="animate-in slide-in-from-right duration-300">
                    <h2 className="text-4xl font-serif font-bold text-[#0C3963] mb-4">Tell us about the situation.</h2>
                    <p className="text-gray-600 mb-8 text-lg">Describe the context (e.g., job role, team size, or specific challenges) for a more precise recommendation.</p>
                    
                    <textarea 
                        value={contextText}
                        onChange={(e) => setContextText(e.target.value)}
                        placeholder="Describe your needs here... (Minimum 10 characters)"
                        className="w-full h-56 p-6 border border-gray-200 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0C3963] text-xl resize-none mb-6 bg-gray-50/30"
                    />

                    {isAnalyzing && (
                        <div className="flex items-center justify-center gap-4 text-[#0C3963] font-bold animate-pulse py-4">
                            <Loader2 className="animate-spin" size={24} />
                            <span className="text-lg uppercase tracking-wider">LHH Science Engine Analyzing...</span>
                        </div>
                    )}
                </div>
            )}

            {step === 4 && (
                 <div className="animate-in slide-in-from-bottom-8 duration-500 pb-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                            <CheckCircle size={14} /> Analysis Complete
                        </div>
                        <h2 className="text-4xl font-serif font-bold text-[#0C3963] mb-3">Your Recommended Solutions</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Based on your objective for <span className="font-bold text-[#0C3963]">{getGoalLabel(goal)}</span>, we recommend the following validated instruments.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {recommendations.map(item => (
                            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group border-b-4 border-b-transparent hover:border-b-[#0C3963]">
                                <div className="relative h-56">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#0C3963]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-[#0C3963]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            onClick={() => onViewDetails(item)}
                                            className="bg-white text-[#0C3963] px-8 py-3 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all"
                                        >
                                            Product Details
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#0C3963] transition-colors">{item.name}</h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Provider: {item.provider}</p>
                                    
                                    <p className="text-sm text-gray-600 mb-8 flex-grow line-clamp-3 leading-relaxed">
                                        {item.description}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mt-auto mb-6">
                                        <span className="text-2xl font-bold text-[#0C3963]">${item.price.toFixed(2)}</span>
                                        <button 
                                            onClick={() => {
                                                onSelectProduct(item);
                                                onClose();
                                            }}
                                            className="bg-[#0C3963] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2C4D81] transition-all shadow-md active:scale-95"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                    {item.sampleReportUrl && (
                                      <a 
                                        href={item.sampleReportUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold rounded-lg bg-gray-50 border border-gray-100 text-[#0C3963] hover:bg-[#E0E9F4] transition-colors"
                                      >
                                        <FileText size={16} /> Sample Report
                                      </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Return Navigation Options */}
                    <div className="mt-16 flex flex-col items-center gap-6">
                        <button 
                           onClick={handleFinishAndHome}
                           className="flex items-center gap-3 bg-[#E0E9F4] text-[#0C3963] px-10 py-4 rounded-full font-bold hover:bg-[#0C3963] hover:text-white transition-all shadow-sm group"
                        >
                            <Home size={20} />
                            Return to Homepage
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <div className="flex gap-8">
                           <button onClick={() => setStep(1)} className="text-gray-400 font-bold hover:text-[#0C3963] text-sm uppercase tracking-widest transition-colors">
                               Start Over
                           </button>
                           <button onClick={() => { onNavigateToBrowse(); onClose(); }} className="text-gray-400 font-bold hover:text-[#0C3963] text-sm uppercase tracking-widest transition-colors">
                               Browse Catalog
                           </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Footer Navigation (Step 1-3) */}
        {step < 4 && (
            <div className="mt-12 flex justify-between items-center bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <button 
                    onClick={step === 1 ? onClose : handleBack} 
                    className="px-8 py-3.5 text-gray-500 font-bold hover:text-gray-800 transition-colors uppercase text-sm tracking-wider"
                >
                    {step === 1 ? 'Exit Finder' : 'Previous Step'}
                </button>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Step {step} of 3</span>
                  <button 
                      onClick={handleNextStep}
                      disabled={isAnalyzing || (step === 1 && !userType) || (step === 2 && !goal) || (step === 3 && contextText.trim().length < 10)}
                      className="px-12 py-3.5 bg-[#0C3963] text-white rounded-xl font-bold hover:bg-[#2C4D81] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95 flex items-center gap-2"
                  >
                      {step === 3 ? 'Generate Matches' : 'Continue'}
                      <ArrowRight size={18} />
                  </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

const RadioOption = ({ selected, onClick, label }: { selected: boolean, onClick: () => void, label: string }) => (
    <button 
        onClick={onClick}
        className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${
            selected 
            ? 'border-[#0C3963] bg-white shadow-md' 
            : 'border-gray-50 bg-white hover:border-gray-200 hover:bg-gray-50/50'
        }`}
    >
        <div className="flex items-center gap-5">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selected ? 'border-[#0C3963] bg-[#0C3963]' : 'border-gray-300'}`}>
            {selected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
          </div>
          <span className={`text-xl transition-colors ${selected ? 'font-bold text-[#0C3963]' : 'text-gray-700 font-medium'}`}>
              {label}
          </span>
        </div>
        {selected && <CheckCircle size={20} className="text-[#0C3963]" />}
    </button>
)

export default AssessmentWizard;