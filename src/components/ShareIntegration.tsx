
import { Globe, QrCode, Link } from 'lucide-react';

export const ShareIntegration = () => {
  const integrations = [
    {
      icon: Globe,
      title: "iFrame export",
      description: "Intégration native sur votre site web avec responsive automatique"
    },
    {
      icon: QrCode,
      title: "QR code custom",
      description: "QR codes personnalisés pour vos supports print et événementiels"
    },
    {
      icon: Link,
      title: "Lien partage instantané",
      description: "URLs courtes et mémorables pour vos campagnes multi-canaux"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-gray-warm mb-4">
            Partage & intégration
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-2xl mx-auto">
            Diffusez vos expériences sur tous vos points de contact
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {integrations.map((integration, index) => (
            <div 
              key={index}
              className="p-8 bg-gradient-to-br from-gray-light to-white rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-250 group hover:scale-102"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-250">
                <integration.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-sora font-bold text-gray-warm mb-3">
                {integration.title}
              </h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                {integration.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="inline-block p-6 bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-2xl border border-primary/20">
            <p className="font-inter text-gray-600 text-lg max-w-3xl">
              Vos jeux peuvent vivre sur tous vos canaux : site, email, PLV, borne, réseaux sociaux, campagnes publicitaires...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
