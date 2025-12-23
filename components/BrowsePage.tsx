import React, { useState, useMemo, useEffect } from 'react';
import { Assessment } from '../types';
import { ListChecks, Search, FileText } from 'lucide-react';

interface BrowsePageProps {
  assessments: Assessment[];
  categories: string[];
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
  categories,
  initialCategory = 'All Categories',
  onAddToCart,
  onToggleCompare,
  comparisonList,
  onViewDetails,
  onShowComparison
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedUseCase, setSelectedUseCase] = useState<string>('All Uses');
  const [selectedLevel, setSelectedLevel] = useState<string>('All Levels');

  // Sync state if initialCategory prop changes (e.g. clicking header link while already on page)
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Derive unique Use Cases and Levels from data
  const useCases = useMemo(() => {
    const all = assessments.flatMap(a => a.useCase || []);
    return ['All Uses', ...Array.from(new Set(all))];
  }, [assessments]);

  const levels = useMemo(() => {
    const all = assessments.flatMap(a => a.level || []);
    return ['All Levels', ...Array.from(new Set(all))];
  }, [assessments]);

  const filteredAssessments = useMemo(() => {
    return assessments.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
      
      const matchesUseCase = selectedUseCase === 'All Uses' || (item.useCase && item.useCase.includes(selectedUseCase as any));
      
      const matchesLevel = selectedLevel === 'All Levels' || (item.level && item.level.includes(selectedLevel as any));

      return matchesSearch && matchesCategory && matchesUseCase && matchesLevel;
    });
  }, [assessments, searchQuery, selectedCategory, selectedUseCase, selectedLevel]);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div id="catalog" className="container mx-auto px-6 md:px-12">
        
        {/* Header Section with Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
            <div className="w-full lg:max-w-2xl">
              <h2 className="text-3xl font-serif font-bold text-[#0C3963] mb-4">Browse All Assessments</h2>
              <div className="relative">
                 <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                 <input 
                   type="text" 
                   placeholder="Search by assessment name, keyword, or description..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0C3963] bg-white text-gray-700 placeholder-gray-400"
                 />
              </div>
            </div>

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

        {/* Advanced Filters Bar */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
               <button
                  onClick={() => setSelectedCategory('All Categories')}
                  className={`px-3 py-1.5 rounded text-sm transition-colors border ${selectedCategory === 'All Categories' ? 'bg-[#0C3963] text-white border-[#0C3963] font-bold' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
               >
                 All Categories
               </button>
               {categories.filter(c => c !== 'All Categories').map(cat => (
                 <button
                   key={cat}
                   onClick={() => setSelectedCategory(cat)}
                   className={`px-3 py-1.5 rounded text-sm transition-colors border ${selectedCategory === cat ? 'bg-[#0C3963] text-white border-[#0C3963] font-bold' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200 mx-2"></div>

            {/* Dropdowns for Level & Use Case */}
            <div className="flex gap-4 w-full md:w-auto">
              <select 
                value={selectedUseCase}
                onChange={(e) => setSelectedUseCase(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#0C3963] focus:border-[#0C3963] block w-full md:w-40 p-2.5 cursor-pointer"
              >
                {useCases.map(uc => <option key={uc} value={uc}>{uc}</option>)}
              </select>

               <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#0C3963] focus:border-[#0C3963] block w-full md:w-40 p-2.5 cursor-pointer"
              >
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
        </div>

        {/* Results Table */}
        {filteredAssessments.length > 0 ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white overflow-x-auto">
              <table className="w-full text-left min-w-[900px]">
                  <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-16 text-center">Compare</th>
                          <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Assessment</th>
                          <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                          <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Duration</th>
                          <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Sample</th>
                          <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-32"></th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {filteredAssessments.map(item => (
                          <tr key={item.id} className="hover:bg-[#F9FAFB] transition-colors group">
                              <td className="py-5 px-6 align-middle text-center">
                                  <input 
                                      type="checkbox" 
                                      checked={comparisonList.includes(item.id)}
                                      onChange={() => onToggleCompare(item.id)}
                                      className="w-5 h-5 rounded border-gray-300 text-[#0C3963] focus:ring-[#0C3963] cursor-pointer"
                                  />
                              </td>
                              <td className="py-5 px-6">
                                  <button 
                                    onClick={() => onViewDetails(item)}
                                    className="font-bold text-[#0C3963] text-base group-hover:text-[#2C4D81] text-left hover:underline block mb-1"
                                  >
                                    {item.name}
                                  </button>
                                  <span className="text-xs text-gray-400 md:hidden">{item.category}</span>
                              </td>
                              <td className="py-5 px-6 hidden md:table-cell">
                                  <span className="inline-block px-2.5 py-1 bg-[#F3F0FF] text-[#5B21B6] text-xs font-bold rounded-full">
                                      {item.category}
                                  </span>
                              </td>
                              <td className="py-5 px-6 text-sm text-gray-600 hidden lg:table-cell">
                                  {item.duration || 'Varies'}
                              </td>
                              <td className="py-5 px-6">
                                  {item.sampleReportUrl && (
                                    <a 
                                      href={item.sampleReportUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-[#0C3963] hover:text-[#2C4D81] transition-colors flex items-center gap-1.5 text-sm font-medium"
                                    >
                                      <FileText size={16} />
                                      <span className="hidden sm:inline">Report</span>
                                    </a>
                                  )}
                              </td>
                              <td className="py-5 px-6 font-bold text-gray-900">
                                  ${item.price.toFixed(2)}
                              </td>
                              <td className="py-5 px-6 flex items-center gap-3 justify-end">
                                  <button 
                                    onClick={() => onViewDetails(item)}
                                    className="text-sm font-bold text-[#0C3963] hover:underline hidden sm:block"
                                  >
                                    Details
                                  </button>
                                  <button 
                                      onClick={() => onAddToCart(item)}
                                      className="bg-[#2C0B4A] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#1a0f2e] transition-colors shadow-sm"
                                  >
                                      Add
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="text-gray-300 mb-4 text-6xl">?</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No assessments found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {
                 setSearchQuery('');
                 setSelectedCategory('All Categories');
                 setSelectedUseCase('All Uses');
                 setSelectedLevel('All Levels');
              }}
              className="text-[#0C3963] font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;