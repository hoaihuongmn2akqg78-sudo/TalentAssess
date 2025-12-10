import React from 'react';
import { Assessment } from '../types';
import { X, CheckCircle2, ArrowLeft } from 'lucide-react';

interface Props {
  assessments: Assessment[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

const ComparisonTable: React.FC<Props> = ({ assessments, onRemove, onClose }) => {
  if (assessments.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-[#0C3963]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-[#E0E9F4]">
          <div>
            <h2 className="text-2xl font-bold text-[#0C3963]">Assessment Comparison</h2>
            <p className="text-[#2C4D81] text-sm">Comparing {assessments.length} products</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-auto flex-grow p-6">
          <div className="min-w-[800px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-48 text-left text-gray-400 font-medium py-4">Features</th>
                  {assessments.map(item => (
                    <th key={item.id} className="w-64 px-4 py-4 text-left relative">
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-[#C7593A]"
                      >
                        <X size={16} />
                      </button>
                      <div className="font-bold text-xl text-gray-900">{item.name}</div>
                      <div className="text-[#0C3963] font-bold text-lg mt-1">${item.price}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 font-semibold text-gray-700">Category</td>
                  {assessments.map(item => (
                    <td key={item.id} className="px-4 py-4 text-gray-600">
                      <span className="bg-[#E0E9F4] text-[#0C3963] px-2 py-1 rounded text-xs font-bold uppercase">
                        {item.category}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-gray-700">Best For</td>
                  {assessments.map(item => (
                    <td key={item.id} className="px-4 py-4 text-gray-600 italic">
                      "{item.bestFor}"
                    </td>
                  ))}
                </tr>
                 <tr>
                  <td className="py-4 font-semibold text-gray-700 align-top">Features</td>
                  {assessments.map(item => (
                    <td key={item.id} className="px-4 py-4 align-top">
                      <ul className="space-y-2">
                        {item.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <CheckCircle2 size={14} className="text-[#2C6A82] mr-2 mt-1 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-gray-700 align-top">Benefits</td>
                  {assessments.map(item => (
                    <td key={item.id} className="px-4 py-4 align-top">
                       <ul className="space-y-2">
                        {item.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            • {benefit}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
           <span className="text-sm text-gray-500">Need help deciding? Try our <b>Smart Advisor</b>.</span>
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-[#0C3963] text-white rounded font-medium hover:bg-[#2C4D81] flex items-center gap-2"
           >
             <ArrowLeft size={16} />
             Back to Browse
           </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;