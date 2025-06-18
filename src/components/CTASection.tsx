
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-light relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 100 0 L 0 0 0 100" fill="none" stroke="%23FFFFFF" stroke-width="1" opacity="0.1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)"/%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
          Essayez votre première création
        </h2>
        <p className="text-xl font-inter text-white/90 mb-8 max-w-2xl mx-auto">
          Transformez vos idées en expériences captivantes. Créez votre premier jeu en moins de 5 minutes.
        </p>
        
        <Button 
          size="lg"
          className="bg-white text-primary hover:bg-white/90 font-inter font-semibold px-12 py-4 text-lg hover:scale-104 transition-all duration-250 shadow-xl"
        >
          Générez votre jeu maintenant
        </Button>
        
        <p className="text-white/70 font-inter text-sm mt-4">
          Aucune carte bancaire requise • Résultat immédiat • SaaS français
        </p>
      </div>
    </section>
  );
};
