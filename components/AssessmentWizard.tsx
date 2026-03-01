import React, { useState, useMemo, useEffect } from 'react';
import { X, ChevronRight, CheckCircle, Loader2, FileText, Home, ArrowRight, Target, Users, User, Zap, BarChart3, Search } from 'lucide-react';
import { Assessment } from '../types';
import { TAXONOMY } from '../constants';

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

type UserType = 'individual' | 'organization';
type InsightLevel = 'quick' | 'deep';

interface WizardState {
  userType: UserType | null;
  objective: string;
  audience: string;
  traits: string[];
  insightLevel: InsightLevel | null;
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
  const [state, setState] = useState<WizardState>({
    userType: initialType || null,
    objective: '',
    audience: '',
    traits: [],
    insightLevel: null
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep(initialType ? 2 : 1);
      setState({
        userType: initialType || null,
        objective: '',
        audience: '',
        traits: [],
        insightLevel: null
      });
      setIsAnalyzing(false);
    }
  }, [isOpen, initialType]);

  const handleNext = () => {
    // Logic for conditional Step 3
    if (step === 2 && state.userType === 'individual') {
      setStep(4); // Skip audience for individuals
    } else if (step === 5) {
      handleAnalyze();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 4 && state.userType === 'individual') {
      setStep(2);
    } else {
      setStep(step - 1);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(6); // Results step
    }, 2000);
  };

  const results = useMemo(() => {
    if (step !== 6) return null;

    // Scoring logic
    const scored = assessments.map(a => {
      let score = 0;
      
      // Match traits (Step 4)
      const traitMatches = state.traits.filter(t => a.tags?.includes(t)).length;
      score += traitMatches * 3;

      // Match objective (Step 2)
      if (state.objective === 'hiring' && a.useCase?.includes('Selection')) score += 5;
      if (state.objective === 'leadership' && a.tags?.includes('Leadership')) score += 5;
      if (state.objective === 'team' && a.tags?.includes('Team Dynamics')) score += 5;
      if (state.objective === 'career' && a.tags?.includes('Career Development')) score += 5;
      if (state.objective === 'awareness' && a.tags?.includes('Personality')) score += 5;

      // Match Insight Level (Step 5)
      if (state.insightLevel === 'deep') {
        if (a.duration.includes('60') || a.duration.includes('45') || a.methodology.includes('Wave')) score += 4;
      } else {
        if (a.duration.includes('20') || a.duration.includes('15')) score += 4;
      }

      // Match Audience (Step 3)
      if (state.userType === 'organization') {
        if (state.audience === 'c-suite' && (a.id.includes('wave') || a.id.includes('hogan'))) score += 3;
        if (state.audience === 'entry' && a.id.includes('disc')) score += 3;
      }

      return { assessment: a, score };
    }).sort((a, b) => b.score - a.score);

    const topMatch = scored[0].assessment;
    const complementary = scored.slice(1, 4).map(s => s.assessment);

    // Generate Rationale
    let rationale = `Based on your focus on ${state.objective.replace('-', ' ')} and your need to measure ${state.traits.slice(0, 2).join(' & ')}, we recommend the ${topMatch.name}. `;
    if (state.insightLevel === 'deep') {
      rationale += "This tool provides the granular, high-impact data required for deep professional transformation.";
    } else {
      rationale += "This assessment offers a streamlined, high-validity snapshot perfect for rapid decision-making.";
    }

    return { topMatch, rationale, complementary };
  }, [step, assessments, state]);

  const toggleTrait = (trait: string) => {
    setState(prev => ({
      ...prev,
      traits: prev.traits.includes(trait) 
        ? prev.traits.filter(t => t !== trait) 
        : [...prev.traits, trait]
    }));
  };

  if (!isOpen) return null;

  const totalSteps = 5;
  const progressPercent = (Math.min(step, totalSteps) / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0C3963]/10 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[700px]">
        
        {/* Sidebar / Progress */}
        <div className="w-full md:w-80 bg-[#0C3963] p-8 text-white flex flex-col">
          <div className="text-2xl font-serif font-bold mb-12">
            TALENT<span className="font-sans font-light opacity-60">ASSESS</span>
          </div>
          
          <div className="flex-grow space-y-6">
            <StepIndicator current={step} stepNumber={1} label="Purchase For" />
            <StepIndicator current={step} stepNumber={2} label="Objective" />
            {state.userType === 'organization' && <StepIndicator current={step} stepNumber={3} label="Target Audience" />}
            <StepIndicator current={step} stepNumber={4} label="Traits" />
            <StepIndicator current={step} stepNumber={5} label="Insight Level" />
          </div>

          <div className="mt-auto pt-8 border-t border-white/10">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
              <span>Progress</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col bg-gray-50 overflow-y-auto">
          <div className="p-8 md:p-12 flex-grow">
            {isAnalyzing ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full animate-pulse" />
                  <Loader2 className="animate-spin text-[#0C3963] relative" size={64} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-[#0C3963] mb-2">Consulting our Experts</h2>
                <p className="text-gray-500 max-w-sm">We're matching your specific needs against our library of validated psychometrics...</p>
              </div>
            ) : step === 1 ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-4xl font-serif font-bold text-[#0C3963] mb-8">Who are you purchasing for?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <OptionCard 
                    selected={state.userType === 'individual'} 
                    onClick={() => setState(s => ({ ...s, userType: 'individual' }))}
                    icon={User}
                    title="For Myself"
                    desc="Personal growth, career transition, or self-awareness."
                  />
                  <OptionCard 
                    selected={state.userType === 'organization'} 
                    onClick={() => setState(s => ({ ...s, userType: 'organization' }))}
                    icon={Users}
                    title="For My Organization"
                    desc="Hiring, leadership development, or team cohesion."
                  />
                </div>
              </div>
            ) : step === 2 ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-4xl font-serif font-bold text-[#0C3963] mb-8">What is your primary objective?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {state.userType === 'individual' ? (
                    <>
                      <SelectButton selected={state.objective === 'career'} onClick={() => setState(s => ({ ...s, objective: 'career' }))} label="Career Transition" />
                      <SelectButton selected={state.objective === 'awareness'} onClick={() => setState(s => ({ ...s, objective: 'awareness' }))} label="Self-Awareness" />
                      <SelectButton selected={state.objective === 'leadership'} onClick={() => setState(s => ({ ...s, objective: 'leadership' }))} label="Leadership Growth" />
                      <SelectButton selected={state.objective === 'conflict'} onClick={() => setState(s => ({ ...s, objective: 'conflict' }))} label="Conflict Management" />
                    </>
                  ) : (
                    <>
                      <SelectButton selected={state.objective === 'hiring'} onClick={() => setState(s => ({ ...s, objective: 'hiring' }))} label="Hiring & Selection" />
                      <SelectButton selected={state.objective === 'leadership'} onClick={() => setState(s => ({ ...s, objective: 'leadership' }))} label="Leadership Development" />
                      <SelectButton selected={state.objective === 'team'} onClick={() => setState(s => ({ ...s, objective: 'team' }))} label="Team Cohesion" />
                      <SelectButton selected={state.objective === 'succession'} onClick={() => setState(s => ({ ...s, objective: 'succession' }))} label="Succession Planning" />
                    </>
                  )}
                </div>
              </div>
            ) : step === 3 ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-4xl font-serif font-bold text-[#0C3963] mb-8">Who is the target audience?</h2>
                <div className="grid grid-cols-1 gap-4">
                  <SelectButton selected={state.audience === 'c-suite'} onClick={() => setState(s => ({ ...s, audience: 'c-suite' }))} label="C-Suite & Executive Leadership" />
                  <SelectButton selected={state.audience === 'mid'} onClick={() => setState(s => ({ ...s, audience: 'mid' }))} label="Mid-Level Management" />
                  <SelectButton selected={state.audience === 'entry'} onClick={() => setState(s => ({ ...s, audience: 'entry' }))} label="Entry-Level & Individual Contributors" />
                </div>
              </div>
            ) : step === 4 ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-4xl font-serif font-bold text-[#0C3963] mb-2">What traits do you need to measure?</h2>
                <p className="text-gray-500 mb-8">Select all that apply to your specific use case.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TAXONOMY.tags.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => toggleTrait(tag)}
                      className={`px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                        state.traits.includes(tag) 
                          ? 'bg-[#0C3963] border-[#0C3963] text-white shadow-lg' 
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : step === 5 ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-4xl font-serif font-bold text-[#0C3963] mb-8">What level of insight are you looking for?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <OptionCard 
                    selected={state.insightLevel === 'quick'} 
                    onClick={() => setState(s => ({ ...s, insightLevel: 'quick' }))}
                    icon={Zap}
                    title="Quick Screening"
                    desc="Fast, high-validity snapshots for rapid decision making."
                  />
                  <OptionCard 
                    selected={state.insightLevel === 'deep'} 
                    onClick={() => setState(s => ({ ...s, insightLevel: 'deep' }))}
                    icon={BarChart3}
                    title="Deep Analysis"
                    desc="Granular, comprehensive reports for high-stakes development."
                  />
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-4">
                  <CheckCircle size={16} /> Consultation Complete
                </div>
                <h2 className="text-4xl font-serif font-bold text-[#0C3963] mb-8">Your Professional Path</h2>
                
                {results && (
                  <div className="space-y-12">
                    {/* Top Match */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white px-6 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-widest">
                        Top Match
                      </div>
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                          <img src={results.topMatch.image} alt={results.topMatch.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{results.topMatch.provider}</span>
                          <h3 className="text-3xl font-bold text-[#0C3963] mb-4">{results.topMatch.name}</h3>
                          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-6">
                            <p className="text-emerald-800 text-sm italic">"{results.rationale}"</p>
                          </div>
                          <div className="flex flex-wrap gap-4 items-center">
                            <span className="text-2xl font-bold text-gray-900">${results.topMatch.price.toFixed(2)}</span>
                            <button 
                              onClick={() => { onSelectProduct(results.topMatch); onClose(); }}
                              className="bg-[#0C3963] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2C4D81] transition-all shadow-lg"
                            >
                              Add to Cart
                            </button>
                            <button 
                              onClick={() => onViewDetails(results.topMatch)}
                              className="text-[#0C3963] font-bold hover:underline text-sm"
                            >
                              View Full Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Complementary */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 border-b pb-2">Complementary Options</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {results.complementary.map(item => (
                          <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="h-32 rounded-xl overflow-hidden mb-4">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h5 className="font-bold text-[#0C3963] text-sm mb-2 line-clamp-1">{item.name}</h5>
                            <p className="text-xs text-gray-500 mb-4 line-clamp-2">{item.description}</p>
                            <button 
                              onClick={() => onViewDetails(item)}
                              className="text-[10px] font-bold text-[#0C3963] uppercase tracking-widest hover:underline flex items-center gap-1"
                            >
                              Details <ArrowRight size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          {step < 6 && (
            <div className="p-8 border-t border-gray-200 bg-white flex justify-between items-center">
              <button 
                onClick={step === 1 ? onClose : handleBack}
                className="text-gray-400 font-bold hover:text-gray-600 transition-colors uppercase text-xs tracking-widest flex items-center gap-2"
              >
                <ChevronRight size={16} className="rotate-180" />
                {step === 1 ? 'Exit' : 'Back'}
              </button>
              
              <button 
                onClick={handleNext}
                disabled={
                  (step === 1 && !state.userType) ||
                  (step === 2 && !state.objective) ||
                  (step === 3 && !state.audience) ||
                  (step === 4 && state.traits.length === 0) ||
                  (step === 5 && !state.insightLevel)
                }
                className="bg-[#0C3963] text-white px-12 py-4 rounded-2xl font-bold hover:bg-[#2C4D81] disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-xl flex items-center gap-2"
              >
                {step === 5 ? 'Get Recommendations' : 'Continue'}
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {step === 6 && (
            <div className="p-8 border-t border-gray-200 bg-white flex justify-center gap-8">
              <button onClick={() => setStep(1)} className="text-gray-400 font-bold hover:text-[#0C3963] text-xs uppercase tracking-widest transition-colors">Start Over</button>
              <button onClick={() => { onNavigateToBrowse(); onClose(); }} className="text-gray-400 font-bold hover:text-[#0C3963] text-xs uppercase tracking-widest transition-colors">Browse Catalog</button>
              <button onClick={onClose} className="text-gray-400 font-bold hover:text-[#0C3963] text-xs uppercase tracking-widest transition-colors">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StepIndicator = ({ current, stepNumber, label }: { current: number, stepNumber: number, label: string }) => {
  const isActive = current === stepNumber;
  const isCompleted = current > stepNumber;
  
  return (
    <div className={`flex items-center gap-4 transition-opacity ${current < stepNumber ? 'opacity-30' : 'opacity-100'}`}>
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
        isActive ? 'bg-emerald-400 border-emerald-400 text-[#0C3963]' : 
        isCompleted ? 'bg-white border-white text-[#0C3963]' : 'border-white/30 text-white'
      }`}>
        {isCompleted ? <CheckCircle size={16} /> : stepNumber}
      </div>
      <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>{label}</span>
    </div>
  );
};

const OptionCard = ({ selected, onClick, icon: Icon, title, desc }: any) => (
  <button 
    onClick={onClick}
    className={`text-left p-8 rounded-3xl border-2 transition-all group relative ${
      selected 
        ? 'border-[#0C3963] bg-white shadow-2xl scale-[1.02]' 
        : 'border-gray-200 bg-white hover:border-gray-300'
    }`}
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${selected ? 'bg-[#0C3963] text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-[#0C3963] mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    {selected && <div className="absolute top-4 right-4 text-emerald-500"><CheckCircle size={24} /></div>}
  </button>
);

const SelectButton = ({ selected, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full text-left p-5 rounded-2xl border-2 font-bold transition-all flex items-center justify-between ${
      selected 
        ? 'bg-[#0C3963] border-[#0C3963] text-white shadow-lg' 
        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
    }`}
  >
    {label}
    {selected && <CheckCircle size={20} />}
  </button>
);

export default AssessmentWizard;
