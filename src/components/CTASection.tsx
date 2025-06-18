
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-light relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
          Essayez gratuitement
        </h2>
        <p className="text-xl font-inter text-white/90 mb-8 max-w-2xl mx-auto">
          Commencez dès aujourd'hui et créez votre première expérience interactive en moins de 10 minutes.
        </p>
        
        <Button 
          size="lg"
          className="bg-white text-primary hover:bg-white/90 font-inter font-semibold px-12 py-4 text-lg hover:scale-104 transition-all duration-250 shadow-xl"
        >
          Créer mon premier jeu
        </Button>
        
        <p className="text-white/70 font-inter text-sm mt-4">
          Aucune carte bancaire requise • Configuration en 2 minutes
        </p>
      </div>
    </section>
  );
};
