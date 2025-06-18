
import { MessageSquare, Gamepad, Share2 } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Décrivez votre marque ou votre idée",
      description: "Quelques mots suffisent : notre IA comprend votre univers et vos objectifs."
    },
    {
      icon: Gamepad,
      title: "Choisissez une mécanique signature",
      description: "Roue, quiz, grattage, jackpot... Sélectionnez le format qui maximise l'engagement."
    },
    {
      icon: Share2,
      title: "Personnalisez et partagez instantanément",
      description: "Ajustez les détails, puis diffusez sur tous vos canaux en un clic."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-warm to-gray-warm/95 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
            Comment ça marche
          </h2>
          <p className="text-lg font-inter text-gray-300 max-w-2xl mx-auto">
            Trois étapes pour transformer vos idées en expériences captivantes
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-104 transition-all duration-250"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-primary/25 transition-shadow duration-250 backdrop-blur-12">
                  <step.icon className="h-9 w-9 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-sora font-bold text-primary shadow-lg">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-sora font-bold text-white mb-4">
                {step.title}
              </h3>
              <p className="font-inter text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
