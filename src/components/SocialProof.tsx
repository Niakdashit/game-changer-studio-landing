
export const SocialProof = () => {
  const logos = [
    { name: "Airbnb", width: "120" },
    { name: "Spotify", width: "100" },
    { name: "Slack", width: "110" },
    { name: "Notion", width: "130" },
    { name: "Figma", width: "90" },
  ];

  return (
    <section className="py-16 bg-gray-light border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/75 backdrop-blur-12 rounded-full border border-gray-200/50 shadow-sm">
            <span className="text-sm font-inter font-medium text-gray-600">
              Déjà <span className="font-semibold text-primary">[2,500+]</span> marques nous font confiance
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
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
    </section>
  );
};
