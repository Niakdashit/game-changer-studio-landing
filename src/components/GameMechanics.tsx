
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const GameMechanics = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const mechanics = [
    {
      name: "Roue 3D",
      description: "Roue de la fortune personnalisable avec effets 3D",
      visual: "🎯",
      category: "Chance"
    },
    {
      name: "Quiz Interactif",
      description: "Questions-réponses avec scoring personnalisé",
      visual: "❓",
      category: "Connaissance"
    },
    {
      name: "Grattage Digital",
      description: "Cartes à gratter avec animation réaliste",
      visual: "💎",
      category: "Surprise"
    },
    {
      name: "Jackpot",
      description: "Machine à sous avec multiplicateurs",
      visual: "🎰",
      category: "Chance"
    },
    {
      name: "Memory",
      description: "Jeu de mémoire avec votre branding",
      visual: "🧠",
      category: "Réflexion"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mechanics.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mechanics.length) % mechanics.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-warm to-gray-warm/95 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
            Mécaniques disponibles
          </h2>
          <p className="text-lg font-inter text-gray-300 max-w-2xl mx-auto">
            Chaque format est optimisé pour maximiser l'engagement et la conversion
          </p>
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {mechanics.map((mechanic, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/10 backdrop-blur-12 rounded-2xl p-8 border border-white/20 text-center">
                    <div className="text-6xl mb-4">{mechanic.visual}</div>
                    <div className="inline-block px-3 py-1 bg-primary/20 rounded-full text-xs font-inter font-medium text-primary-light mb-3">
                      {mechanic.category}
                    </div>
                    <h3 className="text-xl font-sora font-bold text-white mb-3">
                      {mechanic.name}
                    </h3>
                    <p className="font-inter text-gray-300">
                      {mechanic.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex space-x-2">
              {mechanics.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mechanics.map((mechanic, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-12 rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-250 group hover:scale-105"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-250">
                {mechanic.visual}
              </div>
              <div className="inline-block px-3 py-1 bg-primary/20 rounded-full text-xs font-inter font-medium text-primary-light mb-3">
                {mechanic.category}
              </div>
              <h3 className="text-lg font-sora font-bold text-white mb-2">
                {mechanic.name}
              </h3>
              <p className="font-inter text-gray-300 text-sm">
                {mechanic.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
