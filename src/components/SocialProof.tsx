
export const SocialProof = () => {
  const logos = [
    { name: "Airbnb", width: "120" },
    { name: "Spotify", width: "100" },
    { name: "Slack", width: "110" },
    { name: "Notion", width: "130" },
    { name: "Figma", width: "90" },
    { name: "Discord", width: "115" },
  ];

  const metrics = [
    { value: "+2,4M", label: "d'interactions générées" },
    { value: "x4", label: "taux de conversion moyen" },
    { value: "89%", label: "des utilisateurs finalisent la mécanique" }
  ];

  return (
    <section className="py-16 bg-gray-light border-y border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logos */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/75 backdrop-blur-12 rounded-full border border-gray-200/50 shadow-sm mb-8">
            <span className="text-sm font-inter font-medium text-gray-600">
              Déjà <span className="font-semibold text-primary">500+</span> marques nous font confiance
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 mb-12">
            {logos.map((logo, index) => (
              <div 
                key={index}
                className="h-8 flex items-center text-gray-warm font-inter font-semibold text-lg hover:text-primary transition-colors duration-250"
                style={{ width: `${logo.width}px` }}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/60 backdrop-blur-12 rounded-2xl border border-gray-200/50 hover:bg-white/80 transition-all duration-250"
            >
              <div className="text-3xl font-sora font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
                {metric.value}
              </div>
              <div className="font-inter text-gray-600 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
