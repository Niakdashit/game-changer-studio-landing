
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Curved Top Border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-24 text-primary" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,0 L0,0 Z" fill="currentColor"></path>
        </svg>
      </div>
      
      <div className="py-32 bg-gradient-to-br from-primary via-primary-light to-purple-600 relative">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-grid-white/10"></div>
        </div>
        
        {/* Floating Sparkles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-300 rounded-full animate-ping opacity-70"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white rounded-full animate-pulse opacity-80"></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/6 w-3 h-3 bg-pink-300 rounded-full animate-ping opacity-50"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-12 text-white px-4 py-2 rounded-full text-sm font-inter font-semibold mb-8">
              <Sparkles className="w-4 h-4" />
              Prêt à transformer vos idées ?
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-sora font-bold text-white mb-8 leading-tight">
              Essayez GameChanger{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                dès maintenant
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl font-inter text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transformez vos idées en expériences captivantes. Créez votre premier jeu en moins de 5 minutes.
            </p>
            
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-gray-50 font-inter font-bold px-16 py-6 text-xl rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/25 relative overflow-hidden group animate-glow-pulse"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Générez votre premier jeu
              </span>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-shimmer"></div>
            </Button>
            
            <p className="text-white/70 font-inter text-lg mt-8">
              Aucune carte bancaire requise • Résultat immédiat • SaaS français
            </p>
          </div>
        </div>
      </div>
      
      {/* Curved Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-24 text-primary" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};
