import React from 'react';
import { Assessment } from '../types';
import { X, Check, ShoppingCart, Copy, ClipboardCheck, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  assessment: Assessment;
  onClose: () => void;
  onAddToCart: (assessment: Assessment) => void;
  onToggleCompare: (id: string) => void;
  isSelectedForComparison: boolean;
}

const ProductDetailModal: React.FC<Props> = ({ 
  assessment, 
  onClose, 
  onAddToCart, 
  onToggleCompare, 
  isSelectedForComparison 
}) => {
  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          {/* Hero Header */}
          <div className="relative h-64 bg-gray-900">
            <img 
              src={assessment.image} 
              alt={assessment.name} 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="bg-[#C7593A] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider mb-3 inline-block">
                {assessment.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 leading-tight">
                {assessment.name}
              </h1>
              <p className="text-[#E0E9F4] text-lg font-light">
                {assessment.provider}
              </p>
            </div>
          </div>

          {/* Content Layout */}
          <div className="flex flex-col md:flex-row">
            
            {/* Main Content (Left) */}
            <div className="flex-1 p-8 md:p-12 space-y-10">
              
              {/* Overview */}
              <section>
                <h3 className="text-2xl font-bold text-[#0C3963] mb-4 font-serif">Overview</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {assessment.description}
                </p>
              </section>

              {/* What It Measures */}
              <section>
                <h3 className="text-2xl font-bold text-[#0C3963] mb-4 font-serif">What It Measures</h3>
                <p className="text-gray-700 mb-6">{assessment.whatItMeasures}</p>
                <ul className="grid gap-3">
                  {assessment.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 bg-gray-50 p-3 rounded border border-gray-100">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-[#0C3963] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Key Benefits */}
              <section>
                <h3 className="text-2xl font-bold text-[#0C3963] mb-4 font-serif">Key Benefits</h3>
                <ul className="space-y-4">
                  {assessment.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="mt-1 bg-green-100 text-green-700 p-1 rounded-full flex-shrink-0">
                        <Check size={16} strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* FAQ Section */}
              {assessment.faq && assessment.faq.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <HelpCircle className="text-[#0C3963]" />
                    <h3 className="text-2xl font-bold text-[#0C3963] font-serif">Frequently Asked Questions</h3>
                  </div>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 space-y-6">
                    {assessment.faq.map((item, idx) => (
                      <div key={idx} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2 text-base">
                           <span className="text-[#0C3963] font-black">Q:</span> {item.question}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm pl-6">
                           {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Sidebar (Right) */}
            <div className="w-full md:w-96 bg-gray-50 border-l border-gray-200 p-8 flex flex-col">
              
              {/* Quick Facts Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 border-b pb-2">Quick Facts</h4>
                
                <div className="space-y-6">
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Methodology</span>
                    <p className="text-gray-900 font-medium">{assessment.methodology}</p>
                  </div>
                  
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Duration</span>
                    <p className="text-gray-900 font-medium">{assessment.duration}</p>
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Best For</span>
                    <p className="text-gray-900 font-medium">{assessment.bestFor}</p>
                  </div>
                </div>
              </div>

               {/* Fulfillment Process */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <ClipboardCheck size={18} className="text-[#0C3963]" />
                    <h4 className="text-sm font-bold text-[#0C3963] uppercase tracking-wider">Assessment Process</h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                    {assessment.guidance}
                </p>
              </div>

              {/* Pricing & Actions */}
              <div className="bg-[#E0E9F4]/50 p-6 rounded-xl border border-[#BCCADE] text-center mt-auto">
                <div className="text-4xl font-bold text-[#0C3963] mb-2">
                  ${assessment.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 mb-6">Per participant</div>
                
                <button 
                  onClick={() => {
                    onAddToCart(assessment);
                  }}
                  className="w-full bg-[#0C3963] text-white py-4 rounded-lg font-bold hover:bg-[#2C4D81] transition-colors shadow-lg flex items-center justify-center gap-2 mb-3"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                
                {assessment.sampleReportUrl && (
                  <a 
                    href={assessment.sampleReportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-[#0C3963] py-3 rounded-lg font-bold border border-[#0C3963] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-3 shadow-sm"
                  >
                    <FileText size={18} />
                    View Sample Report
                  </a>
                )}

                <button 
                  onClick={() => onToggleCompare(assessment.id)}
                  className={`w-full py-3 rounded-lg font-bold border transition-colors flex items-center justify-center gap-2 ${
                    isSelectedForComparison 
                      ? 'bg-blue-100 border-blue-400 text-blue-700' 
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {isSelectedForComparison ? (
                    <>
                      <CheckCircle2 size={18} />
                      Remove from Compare
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Add to Compare
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;