import React, { useState, useMemo, useEffect } from 'react';
import { Assessment } from '../types';
import { ListChecks, Search, Filter, X, Info } from 'lucide-react';
import { TAXONOMY } from '../constants';

interface BrowsePageProps {
  assessments: Assessment[];
  initialCategory?: string;
  onAddToCart: (assessment: Assessment) => void;
  onToggleCompare: (id: string) => void;
  comparisonList: string[];
  onViewDetails: (assessment: Assessment) => void;
  onStartWizard: (type: 'individual' | 'organization' | null) => void;
  onShowComparison: () => void;
}

const BrowsePage: React.FC<BrowsePageProps> = ({
  assessments,
  initialCategory = 'All Categories',
  onAddToCart,
  onToggleCompare,
  comparisonList,
  onViewDetails,
  onShowComparison
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<string>('All Uses');
  const [selectedLevel, setSelectedLevel] = useState<string>('All Levels');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Derive unique Use Cases and Levels from data
  const useCases = useMemo(() => {
    const all = assessments.flatMap(a => a.useCase || []);
    return ['All Uses', ...Array.from(new Set(all))];
  }, [assessments]);

  const levels = useMemo(() => {
    const all = assessments.flatMap(a => a.level || []);
    return ['All Levels', ...Array.from(new Set(all))];
  }, [assessments]);

  // Calculate product counts for each tag
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    TAXONOMY.tags.forEach(tag => {
      counts[tag] = assessments.filter(a => a.tags?.includes(tag)).length;
    });
    return counts;
  }, [assessments]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Map initialCategory to tags
  useEffect(() => {
    if (initialCategory && initialCategory !== 'All Categories') {
      const categoryToTag: Record<string, string> = {
        'Behavior & Personality': 'Personality',
        'Career Development': 'Career Development',
        'Leadership & Management': 'Leadership',
        'Team Dynamics': 'Team Dynamics'
      };
      const tag = categoryToTag[initialCategory];
      if (tag && !selectedTags.includes(tag)) {
        setSelectedTags([tag]);
      }
    }
  }, [initialCategory]);

  const filteredAssessments = useMemo(() => {
    let filtered = assessments.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => item.tags?.includes(tag));
      
      const matchesUseCase = selectedUseCase === 'All Uses' || (item.useCase && item.useCase.includes(selectedUseCase as any));
      
      const matchesLevel = selectedLevel === 'All Levels' || (item.level && item.level.includes(selectedLevel as any));

      return matchesSearch && matchesTags && matchesUseCase && matchesLevel;
    });

    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [assessments, searchQuery, selectedTags, selectedUseCase, selectedLevel, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedUseCase('All Uses');
    setSelectedLevel('All Levels');
    setSortBy('name');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 py-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
            <div className="w-full lg:max-w-2xl">
              <h2 className="text-3xl font-serif font-bold text-[#0C3963] mb-4">Find Your Assessment</h2>
              <div className="relative">
                 <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                 <input 
                   type="text" 
                   placeholder="Search by name, keyword, or description..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0C3963] bg-white text-gray-700 placeholder-gray-400"
                 />
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Filter size={20} />
                Filters
              </button>
              {comparisonList.length > 0 && (
                  <button 
                      onClick={onShowComparison}
                      className="flex items-center gap-2 bg-[#2C0B4A] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1a0f2e] transition-colors whitespace-nowrap shadow-md"
                  >
                      <ListChecks size={20} />
                      Compare ({comparisonList.length})
                  </button>
              )}
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className={`fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-0 lg:block w-full lg:w-64 bg-white lg:bg-transparent transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="h-full lg:h-auto overflow-y-auto p-6 lg:p-0 bg-white lg:bg-transparent lg:border-none border-r border-gray-200">
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h3 className="text-xl font-bold text-[#0C3963]">Filters</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                {/* Tags Filter */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Assessment Tags</h4>
                  <div className="space-y-2">
                    {TAXONOMY.tags.map(tag => (
                      <label key={tag} className="flex items-center group cursor-pointer">
                        <div className="relative flex items-center">
                          <input 
                            type="checkbox" 
                            checked={selectedTags.includes(tag)}
                            onChange={() => toggleTag(tag)}
                            className="w-5 h-5 rounded border-gray-300 text-[#0C3963] focus:ring-[#0C3963] cursor-pointer"
                          />
                        </div>
                        <span className={`ml-3 text-sm transition-colors flex-grow ${selectedTags.includes(tag) ? 'text-[#0C3963] font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {tag}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded ml-2">
                          {tagCounts[tag] || 0}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Sort By</h4>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#0C3963] focus:border-[#0C3963] block p-2.5 cursor-pointer"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                  </select>
                </div>

                {/* Use Case Filter */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Use Case</h4>
                  <select 
                    value={selectedUseCase}
                    onChange={(e) => setSelectedUseCase(e.target.value)}
                    className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#0C3963] focus:border-[#0C3963] block p-2.5 cursor-pointer"
                  >
                    {useCases.map(uc => <option key={uc} value={uc}>{uc}</option>)}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Target Level</h4>
                  <select 
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#0C3963] focus:border-[#0C3963] block p-2.5 cursor-pointer"
                  >
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <button 
                  onClick={clearFilters}
                  className="w-full py-2 text-sm font-bold text-[#0C3963] hover:text-[#2C4D81] transition-colors border border-[#0C3963] rounded-lg"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-grow">
            {filteredAssessments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAssessments.map(item => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all flex flex-col h-full group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {item.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-[#0C3963]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="mb-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.provider}</span>
                        <h3 className="text-lg font-bold text-[#0C3963] leading-tight mt-1 mb-2">{item.name}</h3>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                        {item.description}
                      </p>

                      {/* Best For Badges */}
                      <div className="mb-4">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Best For</span>
                        <div className="flex flex-wrap gap-1">
                          {item.tags?.map(tag => (
                            <span key={tag} className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <span className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => onViewDetails(item)}
                            className="p-2 text-gray-400 hover:text-[#0C3963] transition-colors"
                            title="View Details"
                          >
                            <Info size={20} />
                          </button>
                          <button 
                            onClick={() => onToggleCompare(item.id)}
                            className={`p-2 transition-colors ${comparisonList.includes(item.id) ? 'text-[#0C3963]' : 'text-gray-400 hover:text-[#0C3963]'}`}
                            title="Compare"
                          >
                            <ListChecks size={20} />
                          </button>
                          <button 
                            onClick={() => onAddToCart(item)}
                            className="bg-[#2C0B4A] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#1a0f2e] transition-colors shadow-sm"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-lg border border-gray-100 shadow-sm">
                <div className="text-gray-300 mb-4 text-6xl">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Updating portfolio, please contact us.</h3>
                <p className="text-gray-500 mb-6">We are currently expanding our offerings in this category. Please reach out for custom solutions.</p>
                <button 
                  onClick={clearFilters}
                  className="text-[#0C3963] font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
