import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ComparisonTable from './components/ComparisonTable';
import GeminiAdvisor from './components/GeminiAdvisor';
import CartDrawer from './components/CartDrawer';
import AssessmentWizard from './components/AssessmentWizard';
import ProductDetailModal from './components/ProductDetailModal';
import HomePage from './components/HomePage';
import BrowsePage from './components/BrowsePage';
import InsightsPage from './components/InsightsPage';
import InfoPage, { InfoPageType } from './components/InfoPage';
import { ASSESSMENTS, BLOG_POSTS } from './constants';
import { Assessment, CartItem } from './types';
import { CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'browse' | 'insights' | 'info'>('home');
  const [browseCategory, setBrowseCategory] = useState<string | undefined>(undefined);
  const [infoPageType, setInfoPageType] = useState<InfoPageType>('guide');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  
  // Wizard State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardInitType, setWizardInitType] = useState<'individual' | 'organization' | null>(null);

  // Product Modal State
  const [selectedProduct, setSelectedProduct] = useState<Assessment | null>(null);

  // Cart Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Extract unique categories for the filters
  const categories = useMemo(() => {
      const cats = Array.from(new Set(ASSESSMENTS.map(a => a.category)));
      return ['All Categories', ...cats];
  }, []);

  const heroAssessments = useMemo(() => {
      // Return top 3 specific ones or just first 3
      return ASSESSMENTS.filter(a => ['mbti-step1-profile', 'hogan-high-potential', 'saville-swift-analysis'].includes(a.id));
  }, []);

  // Cart Logic
  const addToCart = (assessment: Assessment) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === assessment.id);
      if (existing) {
        return prev.map(item => 
          item.id === assessment.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...assessment, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
     setCart(prev => prev.map(item => {
       if (item.id === id) {
         return { ...item, quantity: Math.max(1, item.quantity + delta) };
       }
       return item;
     }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Comparison Logic
  const toggleCompare = (id: string) => {
    setComparisonList(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
  };

  const openWizard = (type: 'individual' | 'organization' | null = null) => {
    setWizardInitType(type);
    setIsWizardOpen(true);
  };

  const handleNavigateToBrowse = (category?: string) => {
      setBrowseCategory(category);
      setCurrentView('browse');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleNavigateToHome = () => {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToInsights = () => {
      setCurrentView('insights');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToInfo = (type: InfoPageType) => {
      setInfoPageType(type);
      setCurrentView('info');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedAssessments = ASSESSMENTS.filter(a => comparisonList.includes(a.id));

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
        onHomeClick={handleNavigateToHome}
        onBrowseClick={() => handleNavigateToBrowse()}
        onInsightsClick={handleNavigateToInsights}
        onWizardClick={() => openWizard(null)}
      />
      
      <main className="flex-grow">
        
        {currentView === 'home' && (
            <HomePage 
                onStartWizard={openWizard}
                onNavigateToBrowse={handleNavigateToBrowse}
                onViewDetails={(item) => setSelectedProduct(item)}
                heroAssessments={heroAssessments}
            />
        )}

        {currentView === 'browse' && (
            <BrowsePage 
                assessments={ASSESSMENTS}
                categories={categories}
                initialCategory={browseCategory}
                onAddToCart={addToCart}
                onToggleCompare={toggleCompare}
                comparisonList={comparisonList}
                onViewDetails={(item) => setSelectedProduct(item)}
                onStartWizard={openWizard}
                onShowComparison={() => setShowComparison(true)}
            />
        )}

        {currentView === 'insights' && (
            <InsightsPage 
                blogPosts={BLOG_POSTS} 
            />
        )}

        {currentView === 'info' && (
            <InfoPage 
                pageType={infoPageType} 
                onBack={handleNavigateToHome} 
                onNavigate={setInfoPageType}
            />
        )}

        {/* Comparison Sticky Bar (Global) */}
        {comparisonList.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#BCCADE] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] py-4 px-6 md:px-12 flex justify-between items-center animate-in slide-in-from-bottom duration-300">
             <div className="flex items-center gap-3">
               <div className="bg-[#E0E9F4] p-2 rounded-full">
                 <CheckCircle2 className="text-[#0C3963]" size={24} />
               </div>
               <div>
                 <span className="font-bold text-gray-900 block">{comparisonList.length} items selected</span>
                 <span className="text-xs text-gray-500">Ready to compare</span>
               </div>
             </div>
             <div className="flex gap-4 items-center">
               <button 
                 onClick={() => setComparisonList([])}
                 className="text-sm text-gray-500 hover:text-[#C7593A] font-medium"
               >
                 Clear all
               </button>
               <button 
                 onClick={() => setShowComparison(true)}
                 className="bg-[#0C3963] text-white px-8 py-3 rounded font-bold hover:bg-[#2C4D81] transition-colors shadow-lg"
               >
                 Compare Now
               </button>
             </div>
          </div>
        )}

        {/* CTA Section (Global Footer Pre-area) */}
        <section className="bg-gray-100 py-20 border-t border-gray-200">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl font-bold text-[#0C3963] font-serif mb-4">Enterprise Solutions</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Looking for volume licensing or custom integration? Our consultants are ready to design a tailored solution for your organization.
            </p>
            <a 
              href="https://forms.zohopublic.com/info3752/form/AssessmentConsultationRequest/formperma/7Y_c_uumlzL0_oSbyj5TXg1IO9P1JEI0R0aiAsu5-u0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#0C3963] text-white px-10 py-4 rounded font-bold hover:bg-[#2C4D81] transition-colors shadow-lg uppercase tracking-wide text-sm"
            >
              Contact Enterprise Sales
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#092b4a] text-white py-12">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-12">
          <div>
             <div className="text-2xl font-serif font-bold tracking-tight mb-6 text-white">
               TALENT<span className="opacity-50 font-sans font-light">ASSESS</span>
             </div>
             <p className="text-[#BCCADE] text-sm leading-relaxed mb-6">
               Lee Hecht Harrison Indochine provides world-class assessment and coaching solutions to elevate individual and organizational performance.
             </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-[#E0E9F4] uppercase tracking-wider text-xs">Solutions</h4>
            <ul className="space-y-3 text-sm text-[#BCCADE]">
              <li><button onClick={() => handleNavigateToBrowse('Aptitude')} className="hover:text-white transition-colors">Talent Acquisition</button></li>
              <li><button onClick={() => handleNavigateToBrowse('Leadership')} className="hover:text-white transition-colors">Leadership Development</button></li>
              <li><button onClick={() => handleNavigateToBrowse('Team Effectiveness')} className="hover:text-white transition-colors">Team Effectiveness</button></li>
              <li><button onClick={() => handleNavigateToBrowse('Personality')} className="hover:text-white transition-colors">Career Transition</button></li>
            </ul>
          </div>
           <div>
            <h4 className="font-bold mb-6 text-[#E0E9F4] uppercase tracking-wider text-xs">Support</h4>
            <ul className="space-y-3 text-sm text-[#BCCADE]">
              <li><button onClick={() => handleNavigateToInfo('guide')} className="hover:text-white transition-colors">Assessment Guide</button></li>
              <li><button onClick={() => handleNavigateToInfo('support')} className="hover:text-white transition-colors">Technical Support</button></li>
              <li><button onClick={() => handleNavigateToInfo('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => handleNavigateToInfo('terms')} className="hover:text-white transition-colors">Terms of Service</button></li>
            </ul>
          </div>
           <div>
            <h4 className="font-bold mb-6 text-[#E0E9F4] uppercase tracking-wider text-xs">Contact</h4>
            <ul className="space-y-3 text-sm text-[#BCCADE]">
              <li className="flex items-start gap-2">
                <span className="opacity-70">Email:</span>
                <a href="mailto:info@lhh.com.vn" className="hover:text-white">info@lhh.com.vn</a>
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                <span className="opacity-70">Phone:</span>
                <span>+84 28 3511 6022</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-[#2C4D81]/30 text-center text-xs text-[#5E7AA6]">
          © 2024 Lee Hecht Harrison Indochine. All rights reserved.
        </div>
      </footer>

      {/* Modals/Overlays */}
      {selectedProduct && (
        <ProductDetailModal 
          assessment={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={(item) => {
            addToCart(item);
            setSelectedProduct(null);
          }}
        />
      )}

      {showComparison && (
        <ComparisonTable 
          assessments={selectedAssessments} 
          onRemove={toggleCompare} 
          onClose={() => setShowComparison(false)} 
        />
      )}
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      <AssessmentWizard 
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        assessments={ASSESSMENTS}
        onSelectProduct={addToCart}
        initialType={wizardInitType}
        onViewDetails={(item) => setSelectedProduct(item)}
        onNavigateToBrowse={() => handleNavigateToBrowse()}
        onNavigateToHome={handleNavigateToHome}
      />

      <GeminiAdvisor assessments={ASSESSMENTS} />
    </div>
  );
};

export default App;