import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onBrowseClick: () => void;
  onWizardClick: () => void;
  onInsightsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onCartClick, 
  onHomeClick, 
  onBrowseClick, 
  onWizardClick,
  onInsightsClick
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm font-sans">
      <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
          <div className="text-3xl font-extrabold tracking-tight text-[#0C3963] font-serif">
            TALENT<span className="text-gray-400 font-sans font-light text-2xl">ASSESS</span>
          </div>
        </div>
          
        {/* Centered Nav */}
        <nav className="hidden md:flex items-center space-x-10 text-gray-600 font-medium text-sm">
          <button onClick={onHomeClick} className="hover:text-[#0C3963] transition-colors">
            Home
          </button>
          <button onClick={onWizardClick} className="hover:text-[#0C3963] transition-colors">
            Find Your Path
          </button>
          <button onClick={onBrowseClick} className="hover:text-[#0C3963] transition-colors">
            Browse All
          </button>
          <button onClick={onInsightsClick} className="hover:text-[#0C3963] transition-colors">
            Insights
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-8">
          <button className="text-sm font-bold text-[#0C3963] hover:underline hidden sm:block">
            Log In
          </button>
          
           <button 
            onClick={onCartClick}
            className="relative text-gray-700 hover:text-[#0C3963] transition-colors"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C7593A] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;