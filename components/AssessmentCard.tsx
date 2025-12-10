import React from 'react';
import { Assessment } from '../types';
import { Check, Info, Plus } from 'lucide-react';

interface Props {
  assessment: Assessment;
  isSelectedForComparison: boolean;
  onToggleCompare: (id: string) => void;
  onAddToCart: (assessment: Assessment) => void;
}

const AssessmentCard: React.FC<Props> = ({ 
  assessment, 
  isSelectedForComparison, 
  onToggleCompare,
  onAddToCart 
}) => {
  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <img 
          src={assessment.image} 
          alt={assessment.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-[#0C3963]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
            {assessment.provider}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-[#0C3963] transition-colors">
            {assessment.name}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {assessment.description}
        </p>
        
        <div className="space-y-3 mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#0C3963]">${assessment.price}</span>
            <button 
              onClick={() => onAddToCart(assessment)}
              className="bg-[#0C3963] text-white p-2 rounded-full hover:bg-[#2C4D81] transition-colors shadow-sm flex items-center justify-center group/btn"
              title="Add to cart"
            >
              <Plus size={18} className="group-hover/btn:rotate-90 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => onToggleCompare(assessment.id)}
              className={`flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-bold rounded border transition-colors ${
                isSelectedForComparison 
                  ? 'bg-[#E0E9F4] border-[#5E7AA6] text-[#0C3963]' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
               {isSelectedForComparison ? <Check size={14} /> : <Plus size={14} />}
               {isSelectedForComparison ? 'Selected' : 'Compare'}
            </button>
            <button className="flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-bold rounded border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
              <Info size={14} /> Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard;