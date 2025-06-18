
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Background with Pulsing Halo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary-light/5 to-gray-light animate-gradient-shift bg-[length:400%_400%]"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-grid-gray-200/10"></div>
      </div>
      
      {/* Pulsing Halo Effect */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-radial from-primary/20 to-transparent rounded-full animate-pulse opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content with Entrance Animation */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-extrabold text-gray-warm leading-tight mb-6 animate-slide-up">
              Transformez chaque interaction en{' '}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent animate-color-shift">
                signature de marque
              </span>{' '}
              mémorable
            </h1>
            
            <h3 className="text-lg md:text-xl font-inter font-medium text-gray-600 mb-8 max-w-[550px] mx-auto lg:mx-0 animate-slide-up delay-200">
              Créez des expériences marketing gamifiées qui captivent, collectent et convertissent
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up delay-400">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-light text-white font-inter font-semibold px-8 py-4 backdrop-blur-12 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/40 animate-glow-pulse relative overflow-hidden group"
              >
                <span className="relative z-10">Créer un jeu maintenant</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:animate-shimmer"></div>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="font-inter font-semibold px-8 py-4 backdrop-blur-12 bg-white/75 hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50"
              >
                <Play className="mr-2 h-5 w-5" />
                Voir une démo interactive
              </Button>
            </div>
          </div>
          
          {/* Right Visual - Premium Spinning Wheel */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 blur-xl animate-pulse"></div>
              
              {/* Main Wheel Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-2xl animate-float">
                {/* Gold Rim */}
                <div className="absolute inset-2 rounded-full border-4 border-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-inner"></div>
                
                {/* Spinning Wheel with Segments */}
                <div className="absolute inset-4 rounded-full overflow-hidden animate-spin-ultra-slow">
                  {/* Wheel Segments */}
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-gradient-conic from-primary via-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-primary"></div>
                    <div className="absolute inset-2 rounded-full bg-white/90 backdrop-blur-sm"></div>
                  </div>
                </div>
                
                {/* Center Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-primary-light shadow-xl flex items-center justify-center">
                  <div className="text-2xl md:text-3xl">🎯</div>
                </div>
                
                {/* Pointer */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 clip-triangle shadow-lg"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full animate-ping opacity-60"></div>
              <div className="absolute top-1/4 -left-8 w-4 h-4 bg-pink-400 rounded-full animate-pulse opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
