import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';

interface HeroProps {
  onStartWizard: (type: 'individual' | 'organization' | null) => void;
  onSearch: (query: string, category: string) => void;
  categories: string[];
  showSearch?: boolean;
}

const Hero: React.FC<HeroProps> = ({ onStartWizard, onSearch, categories, showSearch = true }) => {
  const [searchInput, setSearchInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('All Categories');

  const handleSearchSubmit = () => {
    onSearch(searchInput, categoryInput);
  };

  return (
    <div className={`w-full bg-white ${showSearch ? 'mb-16' : 'mb-0'}`}>
      {/* Main Hero Area */}
      <div className="relative h-[550px] w-full overflow-hidden bg-gray-900">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")' }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Left Color Block Overlay with Diagonal Cut */}
        <div className="absolute inset-0 bg-[#0C3963] hero-diagonal-bg z-10 opacity-95 lg:opacity-100"></div>

        {/* Content Container */}
        <div className="absolute inset-0 z-20 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6 font-serif">
              Unlock Potential <br />
              Through <br />
              Data-Driven Insight
            </h1>
            <p className="text-lg text-[#E0E9F4] mb-8 leading-relaxed max-w-md font-light">
              Navigate the complex landscape of professional assessments. Whether for individual growth, leadership selection, or team synergy, we guide you to the scientifically validated tool you need.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onStartWizard('individual')} // Default to role selection logic
                className="px-8 py-3.5 bg-white text-[#0C3963] font-bold rounded shadow-lg hover:bg-gray-100 transition-all text-sm tracking-wide uppercase"
              >
                Find Your Assessment
              </button>
              <button 
                onClick={() => {
                  // If we are on Home, this might need to trigger navigation to browse
                  const element = document.getElementById('catalog');
                  if(element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                      // Fallback for when on pages without catalog immediately visible
                      onSearch('', 'All Categories'); // This can act as a "Go to browse" trigger in App.tsx
                  }
                }}
                className="px-8 py-3.5 border border-white text-white font-bold rounded hover:bg-white/10 transition-all text-sm tracking-wide uppercase"
              >
                Compare All Tools
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar - Positioned relatively below Hero to prevent overlapping content */}
      {showSearch && (
        <div className="w-full bg-[#f8fafc] border-b border-gray-200 py-8 px-6 shadow-inner">
          <div className="container mx-auto max-w-5xl -mt-16 relative z-30">
            <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center border border-gray-100">
              
              {/* Search Input */}
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Search assessments</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Job title, keyword or assessment name"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded text-gray-700 focus:outline-none focus:border-[#0C3963] focus:ring-1 focus:ring-[#0C3963]"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="w-full md:w-1/3">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Category</label>
                <div className="relative">
                  <Menu className="absolute left-3 top-3 text-gray-400" size={20} />
                  <select 
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded text-gray-700 appearance-none focus:outline-none focus:border-[#0C3963] focus:ring-1 focus:ring-[#0C3963] bg-white cursor-pointer"
                  >
                    <option value="All Categories">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3.5 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400"></div>
                </div>
              </div>

              {/* Search Button */}
              <div className="w-full md:w-auto mt-auto pt-5">
                <button 
                  onClick={handleSearchSubmit}
                  className="w-full md:w-auto px-8 py-2.5 bg-[#2e1a47] text-white font-bold rounded hover:bg-[#1a0f2e] transition-colors"
                  style={{ backgroundColor: '#2C0B4A' }}
                >
                  Search
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
