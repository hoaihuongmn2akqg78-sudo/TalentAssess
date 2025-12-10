import React, { useState } from 'react';
import { BlogPost } from '../types';
import { ArrowRight, Calendar, ArrowLeft, Clock, User, Mail } from 'lucide-react';

interface Props {
  blogPosts: BlogPost[];
}

const InsightsPage: React.FC<Props> = ({ blogPosts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Scroll to top when opening an article
  const handleReadArticle = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedPost) {
    return (
      <div className="bg-white min-h-screen font-sans animate-in fade-in duration-300">
        {/* Progress Bar (Visual flair) */}
        <div className="fixed top-20 left-0 h-1 bg-[#0C3963] w-full origin-left transform scale-x-0 animate-[progress_1s_ease-out_forwards]"></div>

        {/* Article Hero */}
        <div className="relative h-[400px] w-full">
           <div className="absolute inset-0 bg-gray-900">
             <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover opacity-40" />
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
           
           <div className="container mx-auto max-w-4xl px-6 relative h-full flex flex-col justify-end pb-12 z-10">
              <button 
                onClick={handleBack}
                className="absolute top-8 left-6 md:left-0 text-white/80 hover:text-white flex items-center gap-2 font-bold uppercase text-xs tracking-wider transition-colors"
              >
                <ArrowLeft size={16} /> Back to Insights
              </button>
              
              <div className="flex items-center gap-4 mb-4 text-sm font-medium text-[#E0E9F4]">
                <span className="bg-[#C7593A] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                  {selectedPost.category}
                </span>
                <span className="flex items-center gap-1.5">
                   <Calendar size={14} /> {selectedPost.date}
                </span>
                <span className="flex items-center gap-1.5">
                   <Clock size={14} /> {selectedPost.readTime || '5 min read'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-4 shadow-sm">
                {selectedPost.title}
              </h1>
              
              {selectedPost.author && (
                 <div className="flex items-center gap-2 text-white/90">
                   <div className="bg-white/20 p-1.5 rounded-full">
                     <User size={16} />
                   </div>
                   <span className="font-medium">By {selectedPost.author}</span>
                 </div>
              )}
           </div>
        </div>

        {/* Content Body */}
        <div className="container mx-auto max-w-3xl px-6 py-16">
           <div 
             className="prose prose-lg prose-headings:font-serif prose-headings:text-[#0C3963] prose-a:text-[#C7593A] text-gray-700 leading-relaxed"
             dangerouslySetInnerHTML={{ __html: selectedPost.content || '' }}
           />
           
           <div className="mt-16 pt-8 border-t border-gray-100">
             <h4 className="font-bold text-gray-900 mb-6">Share this article</h4>
             <div className="flex gap-4">
               <button className="px-4 py-2 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm font-medium">LinkedIn</button>
               <button className="px-4 py-2 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm font-medium">Twitter</button>
               <button className="px-4 py-2 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm font-medium">Email</button>
             </div>
           </div>
        </div>
        
        {/* Next Article Suggestion (Simple loop logic) */}
        <div className="bg-gray-50 py-16 border-t border-gray-200">
           <div className="container mx-auto max-w-4xl px-6 text-center">
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-4">Keep Reading</p>
              <h3 className="text-2xl font-serif font-bold text-[#0C3963] mb-8">Continue your learning journey</h3>
              <button 
                 onClick={handleBack}
                 className="inline-flex items-center gap-2 text-[#0C3963] font-bold border-b-2 border-[#0C3963] pb-1 hover:text-[#2C4D81] hover:border-[#2C4D81] transition-colors"
              >
                View all articles <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <div className="bg-[#0C3963] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
            <span className="text-[#C7593A] font-bold uppercase tracking-wider text-sm mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-500">
                Knowledge Hub
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-3 duration-700">
              Insights & <br/>Perspectives
            </h1>
            <p className="text-[#BCCADE] text-lg md:text-xl max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Expert analysis on organizational development, leadership psychology, and the future of work. Stay ahead with the latest research-backed trends.
            </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
           {blogPosts.map((post, index) => (
            <article 
                key={post.id} 
                onClick={() => handleReadArticle(post)}
                className="group cursor-pointer flex flex-col h-full bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4">
                     <span className="bg-white/90 backdrop-blur text-[#0C3963] text-xs font-bold px-3 py-1 rounded shadow-sm uppercase tracking-wide">
                        {post.category}
                     </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                 <div className="flex items-center gap-3 text-xs font-medium text-gray-400 mb-3">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                 </div>
                 
                 <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0C3963] transition-colors leading-tight font-serif">
                   {post.title}
                 </h3>
                 
                 <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-6 flex-grow">
                   {post.excerpt}
                 </p>
                 
                 <div className="pt-6 border-t border-gray-100 mt-auto flex items-center text-[#0C3963] font-bold text-sm group-hover:translate-x-1 transition-transform">
                   Read Article <ArrowRight size={16} className="ml-2" />
                 </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-24 bg-[#E0E9F4] rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-1/2">
                    <h3 className="text-2xl font-serif font-bold text-[#0C3963] mb-3">Subscribe to Talentassess Insights</h3>
                    <p className="text-gray-600">Get the latest assessment guides and leadership trends delivered directly to your inbox monthly.</p>
                </div>
                <div className="md:w-1/2 w-full">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0C3963]"
                        />
                        <button className="bg-[#0C3963] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2C4D81] transition-colors flex items-center justify-center gap-2">
                            Subscribe <Mail size={18} />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">We respect your privacy. Unsubscribe at any time.</p>
                </div>
            </div>
            {/* Decorative circle */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/40 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;