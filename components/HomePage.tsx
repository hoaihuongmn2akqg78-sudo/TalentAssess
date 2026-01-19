import React from 'react';
import Hero from './Hero';
import { Assessment } from '../types';
import { ArrowRight, User, Users, Briefcase, Brain, CheckCircle2, FileText } from 'lucide-react';

interface HomePageProps {
  onStartWizard: (type: 'individual' | 'organization' | null) => void;
  onNavigateToBrowse: (category?: string) => void;
  onViewDetails: (assessment: Assessment) => void;
  heroAssessments: Assessment[];
}

const HomePage: React.FC<HomePageProps> = ({ onStartWizard, onNavigateToBrowse, onViewDetails, heroAssessments }) => {
  
  const categories = [
    { 
      name: 'Personality', 
      icon: User, 
      desc: 'Understand behaviors & preferences',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      name: 'Leadership', 
      icon: Briefcase, 
      desc: 'Develop executive potential',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Team Effectiveness', 
      icon: Users, 
      desc: 'Optimize group dynamics',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      name: 'Aptitude', 
      icon: Brain, 
      desc: 'Measure reasoning ability',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
  ];

  return (
    <div className="bg-white">
      <Hero 
        onStartWizard={onStartWizard} 
        onSearch={() => onNavigateToBrowse()} 
        categories={[]} 
        showSearch={false}
      />

      {/* Categories Grid - Visual Upgrade */}
      <section className="py-20 container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#0C3963] mb-4">Explore by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our scientifically validated assessments organized by their primary focus area.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => onNavigateToBrowse(cat.name)}
              className="group relative h-72 w-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 text-left"
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 bg-gray-900">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                />
              </div>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C3963] via-[#0C3963]/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
              
              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-auto transform translate-y-0 opacity-100 transition-all duration-300">
                   <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center text-white mb-4 border border-white/30">
                      <cat.icon size={24} />
                   </div>
                </div>
                
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight tracking-wide">
                    {cat.name}
                  </h3>
                  <p className="text-[#BCCADE] text-sm mb-4 line-clamp-2 opacity-90 group-hover:text-white transition-colors">
                    {cat.desc}
                  </p>
                  
                  <div className="flex items-center text-xs font-bold text-[#C7593A] uppercase tracking-wider group-hover:text-white transition-colors">
                    View Products <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured "Hero" Assessments */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
           <div className="flex justify-between items-end mb-12">
             <div>
                <h2 className="text-3xl font-serif font-bold text-[#0C3963] mb-2">Featured Assessments</h2>
                <p className="text-gray-600">Our most popular tools for driving individual and organizational change.</p>
             </div>
             <button 
                onClick={() => onNavigateToBrowse()}
                className="hidden md:flex items-center font-bold text-[#0C3963] hover:underline"
             >
                View full catalog <ArrowRight size={16} className="ml-2" />
             </button>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
             {heroAssessments.map(item => (
               <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur text-[#0C3963] text-xs font-bold px-3 py-1 rounded shadow-sm border border-gray-100">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0C3963] transition-colors">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-6 flex-grow">{item.description}</p>
                    <ul className="space-y-2 mb-8">
                       {item.features.slice(0, 3).map((f, i) => (
                         <li key={i} className="flex items-start text-sm text-gray-600">
                           <CheckCircle2 size={16} className="text-[#2C6A82] mr-2 mt-0.5 flex-shrink-0" />
                           {f}
                         </li>
                       ))}
                    </ul>
                    <div className="flex flex-col gap-3 mt-auto">
                      <button 
                        onClick={() => onViewDetails(item)}
                        className="w-full py-3 bg-[#0C3963] text-white font-bold rounded hover:bg-[#2C4D81] transition-colors"
                      >
                        Learn More
                      </button>
                      {item.sampleReportUrl && (
                        <a 
                          href={item.sampleReportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-bold text-[#0C3963] hover:bg-gray-50 border border-transparent rounded transition-colors"
                        >
                          <FileText size={16} /> Sample Report
                        </a>
                      )}
                    </div>
                  </div>
               </div>
             ))}
           </div>
           
           <div className="mt-8 text-center md:hidden">
              <button 
                onClick={() => onNavigateToBrowse()}
                className="font-bold text-[#0C3963] hover:underline inline-flex items-center"
             >
                View full catalog <ArrowRight size={16} className="ml-2" />
             </button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;