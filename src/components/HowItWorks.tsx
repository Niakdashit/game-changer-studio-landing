
import { Palette, Gamepad, Share2 } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      icon: Palette,
      title: "Brief & Branding",
      description: "Définissez votre univers graphique et vos objectifs en quelques clics."
    },
    {
      icon: Gamepad,
      title: "Choix mécanique",
      description: "Sélectionnez le format de jeu qui correspond à votre stratégie."
    },
    {
      icon: Share2,
      title: "Partage omnicanal",
      description: "Diffusez sur tous vos supports digitaux avec un seul code d'intégration."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-gray-warm mb-4">
            Trois étapes vers l'engagement parfait
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-2xl mx-auto">
            Notre studio intuitif transforme vos idées en expériences interactives professionnelles.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-104 transition-all duration-250"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-shadow duration-250">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-primary/20 flex items-center justify-center text-xs font-sora font-bold text-primary">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-sora font-bold text-gray-warm mb-3">
                {step.title}
              </h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
