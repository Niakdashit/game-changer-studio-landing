
import { Sparkles, Edit, Download, BarChart3 } from 'lucide-react';

export const FeatureGrid = () => {
  const features = [
    {
      icon: Sparkles,
      title: "IA Branding",
      description: "Intelligence artificielle qui adapte automatiquement le design à votre charte graphique."
    },
    {
      icon: Edit,
      title: "Éditeur Live",
      description: "Modification en temps réel avec prévisualisation instantanée sur tous les appareils."
    },
    {
      icon: Download,
      title: "Export Omnicanal",
      description: "Formats optimisés pour web, mobile, réseaux sociaux et campagnes emailing."
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Tableaux de bord détaillés pour mesurer l'engagement et optimiser les performances."
    }
  ];

  return (
    <section className="py-20 bg-gray-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-4">
            Une technologie à la hauteur de vos ambitions
          </h2>
          <p className="text-lg font-inter text-gray-300 max-w-2xl mx-auto">
            Des outils professionnels pensés pour les équipes créatives les plus exigeantes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 bg-white/5 backdrop-blur-12 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-250 group hover:scale-102"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-sora font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-inter text-gray-300 leading-relaxed">
                    {feature.description}
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
