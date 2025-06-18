
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export const EnhancedGameMechanics = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const mechanics = [
    {
      name: "Roue Interactive 3D",
      description: "Roue personnalisable avec segments animés et effets visuels premium",
      preview: "🎡",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Quiz Dynamique",
      description: "Questions interactives avec timer et animations de réponse",
      preview: "❓",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Carte à Gratter",
      description: "Révélation progressive avec effets de particules réalistes",
      preview: "🎫",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Jackpot Virtuel",
      description: "Machine à sous avec animations fluides et sons d'ambiance",
      preview: "🎰",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Memory Game",
      description: "Jeu de mémoire avec cartes retournables et scoring en temps réel",
      preview: "🧠",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const nextMechanic = () => {
    setCurrentIndex((prev) => (prev + 1) % mechanics.length);
  };

  const prevMechanic = () => {
    setCurrentIndex((prev) => (prev - 1 + mechanics.length) % mechanics.length);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-warm to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-dots-white/10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
            Mécaniques de jeu{' '}
            <span className="bg-gradient-to-r from-primary-light to-yellow-400 bg-clip-text text-transparent">
              nouvelle génération
            </span>
          </h2>
          <p className="text-xl font-inter text-gray-300 max-w-3xl mx-auto">
            Chaque mécanique est pensée pour maximiser l'engagement et créer des moments mémorables
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          <div className="flex items-center justify-center gap-8">
            {/* Previous Button */}
            <button 
              onClick={prevMechanic}
              className="w-12 h-12 bg-white/10 backdrop-blur-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            {/* Main Card */}
            <div className="w-full max-w-lg">
              <div className="relative group">
                {/* Preview Container */}
                <div className={`w-full h-80 bg-gradient-to-br ${mechanics[currentIndex].color} rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl hover:scale-105 transition-all duration-500`}>
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  
                  {/* Preview Icon with Animation */}
                  <div className="text-8xl animate-bounce opacity-90 relative z-10">
                    {mechanics[currentIndex].preview}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-12 text-white px-6 py-3 rounded-full font-inter font-semibold flex items-center gap-2 hover:bg-white/30 transition-colors duration-300">
                      <Eye className="w-5 h-5" />
                      Voir l'aperçu en action
                    </button>
                  </div>
                  
                  {/* Sparkle Effects */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full animate-ping"></div>
                  <div className="absolute bottom-6 left-6 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 left-4 w-1 h-1 bg-white rounded-full animate-bounce"></div>
                </div>
                
                {/* Card Content */}
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-sora font-bold text-white mb-3">
                    {mechanics[currentIndex].name}
                  </h3>
                  <p className="font-inter text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
                    {mechanics[currentIndex].description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Next Button */}
            <button 
              onClick={nextMechanic}
              className="w-12 h-12 bg-white/10 backdrop-blur-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {mechanics.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary-light scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
