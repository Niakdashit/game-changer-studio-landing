
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const InteractivePreview = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  
  const demos = [
    {
      title: "Roue de la Fortune",
      description: "Personnalisable à 100%",
      visual: "🎯"
    },
    {
      title: "Quiz Interactif",
      description: "Collecte de données qualifiées",
      visual: "❓"
    },
    {
      title: "Grattage Digital",
      description: "Effet surprise garanti",
      visual: "💎"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-gray-warm mb-4">
            Vos jeux prennent vie instantanément
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-2xl mx-auto">
            Découvrez la qualité de rendu et l'expérience utilisateur que vous obtiendrez
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Preview */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-light to-white p-8 rounded-3xl border border-gray-200/50 shadow-2xl backdrop-blur-12">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-2xl flex items-center justify-center border border-primary/20">
                <div className="text-8xl animate-pulse">
                  {demos[activeDemo].visual}
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-sora font-bold text-gray-warm mb-2">
                  {demos[activeDemo].title}
                </h3>
                <p className="font-inter text-gray-600">
                  {demos[activeDemo].description}
                </p>
              </div>
            </div>
          </div>
          
          {/* Demo Controls */}
          <div className="space-y-6">
            {demos.map((demo, index) => (
              <Button
                key={index}
                variant={activeDemo === index ? "default" : "outline"}
                className={`w-full p-6 h-auto flex items-center justify-start space-x-4 ${
                  activeDemo === index 
                    ? 'bg-gradient-to-r from-primary to-primary-light text-white' 
                    : 'hover:bg-gray-light'
                } transition-all duration-250`}
                onClick={() => setActiveDemo(index)}
              >
                <div className="text-3xl">{demo.visual}</div>
                <div className="text-left">
                  <div className="font-sora font-bold">{demo.title}</div>
                  <div className="text-sm opacity-80">{demo.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
