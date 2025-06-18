
import { Sparkles, Edit, Download, BarChart3 } from 'lucide-react';

export const WhyChoose = () => {
  const differentiators = [
    {
      icon: Sparkles,
      title: "IA créative + branding instantané",
      description: "Intelligence artificielle qui comprend votre marque et génère des expériences cohérentes en secondes."
    },
    {
      icon: Edit,
      title: "Éditeur visuel ultra-personnalisable",
      description: "Contrôle total sur chaque élément : couleurs, animations, logique de jeu et expérience utilisateur."
    },
    {
      icon: Download,
      title: "Export omnicanal complet",
      description: "URL, iframe, QR code, widget - vos jeux s'intègrent partout : site, email, PLV, borne."
    },
    {
      icon: BarChart3,
      title: "Suivi analytics en temps réel",
      description: "Métriques détaillées d'engagement, conversion et performances pour optimiser vos campagnes."
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-light/50 to-white"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-gray-warm mb-4">
            Pourquoi choisir GameChanger
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-2xl mx-auto">
            Une plateforme pensée pour les marques qui refusent la médiocrité
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {differentiators.map((item, index) => (
            <div 
              key={index}
              className="p-8 bg-white/60 backdrop-blur-12 rounded-2xl border border-gray-200/50 hover:bg-white/80 transition-all duration-250 group hover:scale-102 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-sora font-bold text-gray-warm mb-3">
                    {item.title}
                  </h3>
                  <p className="font-inter text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
