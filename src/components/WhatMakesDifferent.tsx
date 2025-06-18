
export const WhatMakesDifferent = () => {
  const differentiators = [
    {
      title: "Pas un simple générateur",
      description: "Une plateforme conçue pour les directeurs marketing et créatifs qui exigent l'excellence esthétique et technique."
    },
    {
      title: "Une architecture modulaire pensée pour les marques",
      description: "Chaque élément est paramétrable pour s'adapter parfaitement à votre identité et vos objectifs business."
    },
    {
      title: "Une esthétique éditable, mais toujours cohérente",
      description: "Liberté créative totale avec la garantie d'un rendu professionnel qui honore votre image de marque."
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-light/5"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-gray-warm mb-6">
            Ce qui nous différencie
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-102 transition-all duration-250"
            >
              <div className="p-8 bg-white/80 backdrop-blur-12 rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-250">
                <h3 className="text-xl font-sora font-bold text-gray-warm mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="font-inter text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
