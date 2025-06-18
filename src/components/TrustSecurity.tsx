
import { Shield, Key, Zap, Users } from 'lucide-react';

export const TrustSecurity = () => {
  const features = [
    {
      icon: Shield,
      title: "RGPD & Hébergement Sécurisé",
      description: "Serveurs européens, données chiffrées, conformité totale aux réglementations",
      badge: "100% conforme"
    },
    {
      icon: Zap,
      title: "Intégrations Professionnelles", 
      description: "Zapier, HubSpot, Webhooks, Google Sheets, API complète",
      badge: "20+ intégrations"
    },
    {
      icon: Users,
      title: "Support & SLA Entreprise",
      description: "Accompagnement dédié, garanties de performance, formation équipes",
      badge: "Support 24/7"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Organic Wave Separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-20 text-gray-light" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,20 600,100 1200,60 L1200,0 L0,0 Z" fill="currentColor"></path>
        </svg>
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-inter font-semibold mb-6">
            <Shield className="w-4 h-4" />
            Confiance & Sécurité
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-gray-warm mb-6">
            La technologie au service des{' '}
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              marques exigeantes
            </span>
          </h2>
          <p className="text-xl font-inter text-gray-600 max-w-3xl mx-auto">
            Une infrastructure pensée pour les entreprises qui ne transigent pas sur la qualité
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 bg-white/80 backdrop-blur-12 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl hover:scale-103 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-primary-light text-white px-3 py-1 rounded-full text-xs font-inter font-bold shadow-lg">
                  {feature.badge}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-sora font-bold text-gray-warm mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="font-inter text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-20 text-primary/5" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,100 600,20 1200,60 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};
