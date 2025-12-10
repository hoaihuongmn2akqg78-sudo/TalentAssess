import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { Assessment } from '../types';

interface Props {
  assessments: Assessment[];
}

const GeminiAdvisor: React.FC<Props> = ({ assessments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConsult = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const apiKey = process.env.API_KEY || ''; 
      if (!apiKey) {
        setResponse("API Key is missing. Please configure the environment.");
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const context = assessments.map(a => 
        `${a.name} (${a.category}): ${a.description}. Best for: ${a.bestFor}. Features: ${a.features.join(', ')}`
      ).join('\n\n');

      const prompt = `
        You are an expert HR consultant for Lee Hecht Harrison Indochine.
        User Query: "${query}"
        
        Based on the following available assessments catalog, recommend the best 1-2 options.
        Explain WHY specifically based on the user's need. Keep it professional, concise, and persuasive.
        
        Catalog:
        ${context}
      `;

      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setResponse(result.text || "I couldn't generate a recommendation at this time.");

    } catch (error) {
      console.error(error);
      setResponse("I'm having trouble connecting to the knowledge base right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-[#0C3963] text-white p-4 rounded-full shadow-2xl hover:bg-[#2C4D81] transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <div className="flex items-center gap-2">
           <Bot size={24} />
           <span className="font-bold hidden md:inline">Talentassess Advisor</span>
        </div>
      </button>

      {/* Chat Interface */}
      <div className={`fixed bottom-8 right-8 z-50 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 transform transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="p-4 bg-[#0C3963] text-white rounded-t-xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <h3 className="font-bold">Talentassess Advisor</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 h-80 overflow-y-auto bg-gray-50">
          {!response && !isLoading && (
            <div className="text-gray-500 text-sm text-center mt-10">
              <p className="mb-2">👋 Hi! I can help you choose the right assessment.</p>
              <p>Try asking: <em>"I need to hire a CEO"</em> or <em>"My team has conflict issues."</em></p>
            </div>
          )}
          
          {isLoading && (
             <div className="flex justify-center items-center h-full text-[#0C3963]">
               <Loader2 className="animate-spin mr-2" /> Analyzing requirements...
             </div>
          )}

          {response && (
            <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-gray-800 leading-relaxed border border-gray-100">
               <div className="font-bold text-[#0C3963] mb-2 flex items-center gap-2">
                 <Bot size={16} /> Recommendation
               </div>
               {response.split('\n').map((line, i) => (
                 <p key={i} className="mb-2">{line}</p>
               ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConsult()}
              placeholder="Describe your assessment need..."
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C3963] text-sm"
            />
            <button 
              onClick={handleConsult}
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-2 p-1.5 bg-[#0C3963] text-white rounded hover:bg-[#2C4D81] disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeminiAdvisor;