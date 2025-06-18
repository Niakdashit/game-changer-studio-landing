
import { useState, useEffect } from 'react';

export const TestimonialSlider = () => {
  const testimonials = [
    {
      quote: "GameChanger a transformé notre approche de l'engagement client. Nos campagnes génèrent désormais 5x plus d'interactions qualifiées.",
      name: "Sarah Chen",
      role: "Directrice Marketing",
      company: "TechCorp",
      avatar: "👩‍💼"
    },
    {
      quote: "L'esthétique est remarquable et l'intégration seamless. Nos équipes créatives ont enfin l'outil qu'elles méritaient.",
      name: "Marc Dubois",
      role: "Creative Director",
      company: "Studio Alpha",
      avatar: "👨‍🎨"
    },
    {
      quote: "ROI immédiat sur nos campagnes. Les métriques parlent d'elles-mêmes : +340% de temps passé sur nos landing pages.",
      name: "Lisa Wang",
      role: "Head of Digital",
      company: "Fashion Brand",
      avatar: "👩‍💻"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary-light/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-dots-purple-500/5"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-gray-warm mb-4">
            Témoignages clients
          </h2>
          <p className="text-lg font-inter text-gray-600">
            Ils ont choisi l'excellence pour leurs campagnes
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white/60 backdrop-blur-12 p-8 md:p-12 rounded-3xl border border-white/50 shadow-xl">
                    <blockquote className="text-xl md:text-2xl font-inter text-gray-warm leading-relaxed mb-8 text-center">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-2xl shadow-lg">
                        {testimonial.avatar}
                      </div>
                      <div className="text-center">
                        <div className="font-sora font-bold text-gray-warm text-lg">
                          {testimonial.name}
                        </div>
                        <div className="font-inter text-gray-600">
                          {testimonial.role} • {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-250 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
