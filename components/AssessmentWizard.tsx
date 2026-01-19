import React, { useState } from 'react';
import { X, ChevronRight, Circle, CheckCircle, Loader2, FileText } from 'lucide-react';
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
    // Simulate delay
    setTimeout(() => {
        setIsAnalyzing(false);
        setStep(4);
    }, 1500);
  };

  const getRecommendations = () => {
    let results: Assessment[] = [];

    if (userType === 'individual') {
      if (goal === 'growth') results = assessments.filter(a => a.id === 'mbti-step1-profile' || a.id === 'apollo');
      else if (goal === 'leadership') results = assessments.filter(a => a.id === 'saville-wave-leadership-impact' || a.id === 'hogan-leader-focus');
      else if (goal === 'career') results = assessments.filter(a => a.id === 'istartstrong' || a.id === 'mbti-step1-career');
      else results = assessments.filter(a => a.category === 'Personality');
    } else {
      if (goal === 'hiring') results = assessments.filter(a => a.id === 'saville-swift-analysis' || a.id === 'apollo' || a.id === 'watson-glaser');
      else if (goal === 'leadership') results = assessments.filter(a => a.id === 'saville-wave-leadership-impact' || a.id === 'hogan-leader-focus');
      else if (goal === 'team') results = assessments.filter(a => a.id === 'tki-profile-interpretive' || a.id === 'work-engagement-profile-interpretive');
      else if (goal === 'conflict') results = assessments.filter(a => a.id === 'tki-profile-interpretive' || a.id === 'mbti-step1-conflict');
      else results = assessments.filter(a => a.category === 'Leadership');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/95" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl animate-in zoom-in-95 duration-200">
        
        {/* Header / Nav */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="text-3xl font-extrabold tracking-tight text-[#0C3963] font-serif">
                TALENT<span className="text-gray-400 font-sans font-light text-2xl">ASSESS</span>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
               <button 
                  onClick={() => { onNavigateToHome(); onClose(); }} 
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
               <button onClick={onClose} className="flex items-center gap-1 hover:text-[#0C3963] transition-colors">Log In</button>
            </div>
        </div>

        {/* Progress Bar Area */}
        <div className="mb-10">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-4">
                <span className={step >= 1 ? "text-[#0C3963] font-bold" : ""}>Role</span>
                <ChevronRight size={14} />
                <span className={step >= 2 ? "text-[#0C3963] font-bold" : ""}>Goal</span>
                <ChevronRight size={14} />
                <span className={step >= 3 ? "text-[#0C3963] font-bold" : ""}>Context</span>
            </div>
            
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#5B21B6] transition-all duration-500 ease-out"
                  style={{ width: step === 1 ? '20%' : step === 2 ? '50%' : step === 3 ? '75%' : '100%' }}
                />
            </div>
        </div>

        {/* Main Content */}
        <div className="min-h-[400px]">
            {step === 1 && (
                <div className="animate-in slide-in-from-right duration-300">
                    <h2 className="text-3xl font-serif font-bold text-[#0C3963] mb-8">Are you looking for yourself or your organization?</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <button 
                            onClick={() => handleUserTypeSelect('individual')}
                            className={`text-left p-8 rounded-lg border-2 transition-all h-64 flex flex-col justify-center ${
                                userType === 'individual' 
                                ? 'border-[#5B21B6] bg-[#5B21B6]/5' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                        >
                            <h3 className="text-xl font-bold text-[#5B21B6] mb-4">Individual</h3>
                            <p className="text-gray-600 leading-relaxed">
                                I want to understand my own personality, strengths, or career path.
                            </p>
                        </button>

                         <button 
                            onClick={() => handleUserTypeSelect('organization')}
                            className={`text-left p-8 rounded-lg border-2 transition-all h-64 flex flex-col justify-center ${
                                userType === 'organization' 
                                ? 'border-[#5B21B6] bg-[#5B21B6]/5' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                        >
                            <h3 className="text-xl font-bold text-[#5B21B6] mb-4">Organization</h3>
                            <p className="text-gray-600 leading-relaxed">
                                I need to hire, develop leaders, or improve team dynamics.
                            </p>
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                 <div className="animate-in slide-in-from-right duration-300 max-w-3xl">
                    <h2 className="text-3xl font-serif font-bold text-[#0C3963] mb-8">What is your primary objective?</h2>
                    <div className="space-y-4">
                         {userType === 'individual' ? (
                            <>
                                <RadioOption selected={goal === 'growth'} onClick={() => setGoal('growth')} label="Self-Discovery & Growth" />
                                <RadioOption selected={goal === 'leadership'} onClick={() => setGoal('leadership')} label="Leadership Development" />
                                <RadioOption selected={goal === 'career'} onClick={() => setGoal('career')} label="Career Direction" />
                            </>
                         ) : (
                            <>
                                <RadioOption selected={goal === 'hiring'} onClick={() => setGoal('hiring')} label="Hiring & Selection" />
                                <RadioOption selected={goal === 'leadership'} onClick={() => setGoal('leadership')} label="Leadership Development" />
                                <RadioOption selected={goal === 'team'} onClick={() => setGoal('team')} label="Team Cohesion" />
                                <RadioOption selected={goal === 'conflict'} onClick={() => setGoal('conflict')} label="Conflict Resolution" />
                            </>
                         )}
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="animate-in slide-in-from-right duration-300">
                    <h2 className="text-3xl font-serif font-bold text-[#0C3963] mb-4">Tell us a bit more about your situation.</h2>
                    <p className="text-gray-600 mb-6">The more specific you are, the better our AI can match you to the right scientific instrument.</p>
                    
                    <textarea 
                        value={contextText}
                        onChange={(e) => setContextText(e.target.value)}
                        placeholder="e.g., We have a new manager who is struggling to connect with their team, or I am looking to pivot my career..."
                        className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B21B6] text-lg resize-none mb-4"
                    />

                    {isAnalyzing && (
                        <div className="flex items-center gap-3 text-[#5B21B6] font-medium animate-pulse">
                            <Loader2 className="animate-spin" />
                            Analyzing your requirements...
                        </div>
                    )}
                </div>
            )}

            {step === 4 && (
                 <div className="animate-in slide-in-from-right duration-300">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-serif font-bold text-[#0C3963] mb-2">Your Personalized Recommendations</h2>
                        <p className="text-gray-600">Based on your need for <span className="font-bold text-[#5B21B6]">{getGoalLabel(goal)}</span>.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {recommendations.map(item => (
                            <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="relative h-48 group">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-[#2C0B4A] text-white text-xs font-bold px-2 py-1 rounded">
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            onClick={() => onViewDetails(item)}
                                            className="bg-white text-[#0C3963] px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{item.name}</h3>
                                    <p className="text-xs text-gray-500 italic mb-4">by {item.provider}</p>
                                    
                                    <p className="text-sm text-gray-600 mb-6 flex-grow line-clamp-3">
                                        {item.description}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mt-auto mb-4">
                                        <span className="text-xl font-bold text-[#0C3963]">${item.price}</span>
                                        <button 
                                            onClick={() => {
                                                onSelectProduct(item);
                                                onClose();
                                            }}
                                            className="bg-[#2C0B4A] text-white px-6 py-2 rounded font-bold hover:bg-[#1a0f2e] transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>

                                    {item.sampleReportUrl && (
                                      <a 
                                        href={item.sampleReportUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-1.5 w-full py-2 mb-4 text-xs font-bold rounded bg-gray-50 border border-gray-200 text-[#0C3963] hover:bg-gray-100 transition-colors"
                                      >
                                        <FileText size={14} /> Sample Report
                                      </a>
                                    )}

                                    <div className="pt-4 border-t border-gray-100 flex justify-center">
                                        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500 hover:text-gray-800">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                            Compare
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button onClick={() => setStep(1)} className="text-[#5B21B6] font-bold hover:underline">
                            Start Over
                        </button>
                    </div>
                </div>
            )}
        </div>

        {step < 4 && (
            <div className="mt-12 flex justify-between items-center">
                <button 
                    onClick={step === 1 ? onClose : handleBack} 
                    className="px-6 py-3 border border-gray-300 rounded text-gray-600 font-bold hover:bg-gray-50"
                >
                    {step === 1 ? 'Cancel' : 'Back'}
                </button>

                <button 
                    onClick={handleNextStep}
                    disabled={(step === 1 && !userType) || (step === 2 && !goal) || (step === 3 && contextText.trim().length === 0)}
                    className="px-8 py-3 bg-[#7E5296] text-white rounded font-bold hover:bg-[#6b4580] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ backgroundColor: '#7E5296' }} 
                >
                    {step === 3 ? 'Find Best Match' : 'Next Step'}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

const RadioOption = ({ selected, onClick, label }: { selected: boolean, onClick: () => void, label: string }) => (
    <button 
        onClick={onClick}
        className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-4 ${
            selected 
            ? 'border-[#0C3963] bg-white shadow-sm ring-1 ring-[#0C3963]' 
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
    >
        {selected ? (
            <CheckCircle className="text-[#0C3963]" size={24} />
        ) : (
            <Circle className="text-gray-300" size={24} />
        )}
        <span className={`text-lg ${selected ? 'font-bold text-[#0C3963]' : 'text-gray-700'}`}>
            {label}
        </span>
    </button>
)

export default AssessmentWizard;