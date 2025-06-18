
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Background with Light Rays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary-light/5 to-gray-light animate-gradient-shift bg-[length:400%_400%]"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-grid-gray-200/10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-extrabold text-gray-warm leading-tight mb-6">
              Transformez chaque interaction en{' '}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                signature de marque
              </span>{' '}
              mémorable
            </h1>
            
            <h3 className="text-lg md:text-xl font-inter font-medium text-gray-600 mb-8 max-w-[550px] mx-auto lg:mx-0">
              Créez des expériences marketing gamifiées qui captivent, collectent et convertissent
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-light text-white font-inter font-semibold px-8 py-4 backdrop-blur-12 hover:scale-104 transition-all duration-250 shadow-lg hover:shadow-primary/25"
              >
                Créer un jeu maintenant
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="font-inter font-semibold px-8 py-4 backdrop-blur-12 bg-white/75 hover:scale-104 transition-all duration-250"
              >
                <Play className="mr-2 h-5 w-5" />
                Voir une démo interactive
              </Button>
            </div>
          </div>
          
          {/* Right Visual - Enhanced Wheel */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 backdrop-blur-12 border border-white/20 shadow-2xl animate-float"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary/30 flex items-center justify-center animate-spin-slow bg-white/10 backdrop-blur-12">
                  <div className="text-6xl md:text-7xl">🎯</div>
                </div>
              </div>
              {/* Light rays effect */}
              <div className="absolute inset-0 bg-gradient-conic from-primary/20 via-transparent to-primary-light/20 rounded-full animate-pulse opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
